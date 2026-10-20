import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { resolveMediaUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/media";
import type { ShippingRow, PaymentRow } from "@/types/database";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to view your orders." },
        { status: 401 }
      );
    }

    // 1. Fetch all orders for this authenticated customer
    const { data: rawOrders, error: ordersError } = await supabase
      .from("Order")
      .select(`
        id,
        created_at,
        payment,
        status,
        fulfillment,
        shipping,
        total_amount,
        profile_id
      `)
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("[GET /api/orders] Failed to fetch orders:", ordersError);
      return NextResponse.json(
        { success: false, error: "Failed to retrieve orders." },
        { status: 500 }
      );
    }

    if (!rawOrders || rawOrders.length === 0) {
      return NextResponse.json({ success: true, orders: [] });
    }

    const orderIds = rawOrders.map((o) => o.id);
    const shippingIds = rawOrders
      .map((o) => o.shipping)
      .filter((id): id is number => id != null);
    const paymentIds = rawOrders
      .map((o) => o.payment)
      .filter((id): id is string => id != null);

    // 2. Fetch related Shipping, Payment, and OrderItem records in parallel
    const [shippingRes, paymentRes, itemsRes] = await Promise.all([
      shippingIds.length > 0
        ? supabase.from("Shipping").select("*").in("id", shippingIds)
        : Promise.resolve({ data: [] }),
      paymentIds.length > 0
        ? supabase.from("Payment").select("*").in("id", paymentIds)
        : Promise.resolve({ data: [] }),
      orderIds.length > 0
        ? supabase
            .from("OrderItem")
            .select(`
              id,
              order_id,
              product,
              quantity,
              product_title_snapshot,
              unit_price_snapshot,
              total_price,
              Product:product (
                id,
                name,
                slug,
                ProductImage (
                  img_url,
                  is_primary,
                  display_order
                )
              )
            `)
            .in("order_id", orderIds)
        : Promise.resolve({ data: [] }),
    ]);

    const shippingMap = new Map<number, ShippingRow>(
      ((shippingRes.data as ShippingRow[]) || []).map((s) => [s.id, s])
    );
    const paymentMap = new Map<string, PaymentRow>(
      ((paymentRes.data as PaymentRow[]) || []).map((p) => [p.id, p])
    );

    // Group items by order_id
    const itemsByOrder = new Map<number, any[]>();
    for (const item of itemsRes.data || []) {
      const oid = item.order_id;
      if (!itemsByOrder.has(oid)) {
        itemsByOrder.set(oid, []);
      }

      // Resolve primary product thumbnail
      const product = Array.isArray(item.Product) ? item.Product[0] : item.Product;
      const images = product?.ProductImage || [];
      const primaryImg =
        images.find((img: { is_primary?: boolean }) => img.is_primary)?.img_url ||
        images.sort(
          (a: { display_order?: number }, b: { display_order?: number }) =>
            (a.display_order ?? 0) - (b.display_order ?? 0)
        )[0]?.img_url;

      itemsByOrder.get(oid)!.push({
        id: item.id,
        productId: item.product,
        name: item.product_title_snapshot || product?.name || "Handcrafted Swing",
        slug: product?.slug || item.product || "",
        unitPrice: Number(item.unit_price_snapshot) || 0,
        quantity: Number(item.quantity) || 1,
        totalPrice: Number(item.total_price) || 0,
        image: resolveMediaUrl(primaryImg || FALLBACK_IMAGE_URL),
      });
    }

    // 3. Assemble formatted orders
    const orders = rawOrders.map((row) => {
      const shippingRecord = row.shipping ? shippingMap.get(row.shipping) : null;
      const paymentRecord = row.payment ? paymentMap.get(row.payment) : null;
      const orderItems = itemsByOrder.get(row.id) || [];

      return {
        id: row.id,
        orderReference: `#WS-${row.id}`,
        createdAt: row.created_at,
        status: row.status || "new",
        fulfillment: row.fulfillment || "active",
        totalAmount: Number(row.total_amount) || 0,
        shipping: shippingRecord
          ? {
              addressLine1: shippingRecord.address_line1 || "",
              addressLine2: shippingRecord.address_line2 || "",
              city: shippingRecord.city || "",
              state: shippingRecord.state || "",
              postalCode: shippingRecord.postal_code || "",
              country: shippingRecord.country || "India",
              contactPhone: shippingRecord.contact_phone || "",
            }
          : null,
        payment: paymentRecord
          ? {
              id: paymentRecord.id,
              gateway: paymentRecord.gateway || "online",
              gatewayPaymentId: paymentRecord.gateway_payment_id || "",
              gatewayOrderId: paymentRecord.gateway_order_id || "",
              status: paymentRecord.status || "paid",
              amount: Number(paymentRecord.amount) || 0,
            }
          : null,
        items: orderItems,
      };
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("[GET /api/orders] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while loading orders." },
      { status: 500 }
    );
  }
}
