import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: "Razorpay secret is not configured on the server." },
        { status: 500 }
      );
    }

    let body: {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      shipping?: {
        address_line1?: string;
        address_line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
        contact_phone?: string;
      };
      cartItems?: Array<{
        productId?: string;
        name?: string;
        price?: number;
        quantity?: number;
      }>;
      totalAmount?: number | string;
      profileId?: string;
      cartId?: number;
      saveAddress?: boolean;
      customerName?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shipping,
      cartItems,
      totalAmount,
      profileId,
      cartId,
      saveAddress,
      customerName,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required payment verification fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.",
        },
        { status: 400 }
      );
    }

    // Step 3: Compute HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const dataToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(dataToSign)
      .digest("hex");

    // Safe timing-equal comparison
    const generatedBuffer = Buffer.from(generatedSignature);
    const receivedBuffer = Buffer.from(razorpay_signature);

    const isMatch =
      generatedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(generatedBuffer, receivedBuffer);

    if (!isMatch) {
      console.warn("[Razorpay verify-payment] Signature mismatch:", {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature. Payment verification failed.",
        },
        { status: 400 }
      );
    }

    // Payment Signature is Valid!
    let savedPaymentId: string | null = null;
    let savedOrderId: number | null = null;

    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const customerProfileId = user?.id || profileId || null;

      // 1. Insert into "Payment" table
      const { data: paymentRecord, error: paymentError } = await supabase
        .from("Payment")
        .insert({
          gateway: "online",
          gateway_payment_id: razorpay_payment_id,
          gateway_order_id: razorpay_order_id,
          gateway_signature: razorpay_signature,
          amount: totalAmount != null ? String(totalAmount) : null,
          status: "paid",
          raw_response: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            verified_at: new Date().toISOString(),
          },
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .maybeSingle();

      if (paymentError) {
        console.warn("[Razorpay verify-payment] Could not persist Payment record:", paymentError);
      } else if (paymentRecord) {
        savedPaymentId = paymentRecord.id;
      }

      // 2. Insert into "Shipping" table if address information is provided
      let savedShippingId: number | null = null;
      if (shipping && (shipping.address_line1 || shipping.contact_phone || shipping.city)) {
        const { data: shippingRecord, error: shippingError } = await supabase
          .from("Shipping")
          .insert({
            address_line1: shipping.address_line1 || null,
            address_line2: shipping.address_line2 || null,
            city: shipping.city || null,
            state: shipping.state || null,
            postal_code: shipping.postal_code || null,
            country: shipping.country || "India",
            contact_phone: shipping.contact_phone || null,
          })
          .select("id")
          .maybeSingle();

        if (shippingError) {
          console.warn("[Razorpay verify-payment] Could not persist Shipping record:", shippingError);
        } else if (shippingRecord) {
          savedShippingId = shippingRecord.id;
        }
      }

      // 2b. If requested, save/update default address in Profile
      if (customerProfileId && saveAddress && shipping) {
        const profileUpdates: Record<string, unknown> = {};
        if (shipping.address_line1) profileUpdates.address_line1 = shipping.address_line1;
        if (shipping.address_line2 !== undefined) profileUpdates.address_line2 = shipping.address_line2;
        if (shipping.city) profileUpdates.city = shipping.city;
        if (shipping.state !== undefined) profileUpdates.state = shipping.state;
        if (shipping.postal_code) profileUpdates.postal_code = shipping.postal_code;
        if (shipping.country) profileUpdates.country = shipping.country;
        if (shipping.contact_phone) {
          profileUpdates.contact_phone = shipping.contact_phone;
          profileUpdates.phone = shipping.contact_phone;
        }
        if (customerName) profileUpdates.name = customerName;

        const { error: profileError } = await supabase
          .from("Profile")
          .update(profileUpdates)
          .eq("id", customerProfileId);

        if (profileError) {
          console.warn("[Razorpay verify-payment] Could not update Profile default address:", profileError);
        }
      }

      // 3. Insert into "Order" table
      const { data: orderRecord, error: orderError } = await supabase
        .from("Order")
        .insert({
          payment: savedPaymentId,
          status: "new",
          fulfillment: "active",
          shipping: savedShippingId,
          total_amount: totalAmount != null ? String(totalAmount) : null,
          profile_id: customerProfileId,
        })
        .select("id")
        .maybeSingle();

      if (orderError) {
        console.warn("[Razorpay verify-payment] Could not persist Order record:", orderError);
      } else if (orderRecord) {
        savedOrderId = orderRecord.id;

        // 4. Insert into "OrderItem" table
        if (Array.isArray(cartItems) && cartItems.length > 0) {
          const orderItemsData = cartItems.map((item) => ({
            order_id: orderRecord.id,
            product: item.productId || null,
            quantity: Number(item.quantity) || 1,
            product_title_snapshot: item.name || null,
            unit_price_snapshot: item.price != null ? String(item.price) : null,
            total_price: Math.round((Number(item.price) || 0) * (Number(item.quantity) || 1)),
          }));

          const { error: itemsError } = await supabase
            .from("OrderItem")
            .insert(orderItemsData);

          if (itemsError) {
            console.warn("[Razorpay verify-payment] Could not persist OrderItem records:", itemsError);
          }
        }
      }

      // 5. Clean up cart items if cartId provided
      if (cartId) {
        await supabase.from("CartItem").delete().eq("cart", cartId);
      }
    } catch (dbErr) {
      console.warn("[Razorpay verify-payment] Non-fatal DB operation error:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      db_order_id: savedOrderId,
      db_payment_id: savedPaymentId,
    });
  } catch (err) {
    console.error("[Razorpay verify-payment] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during payment verification." },
      { status: 500 }
    );
  }
}
