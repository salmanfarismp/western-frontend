import { NextResponse } from "next/server";
import { razorpayInstance } from "@/lib/razorpay/server";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials are not configured on the server." },
        { status: 500 }
      );
    }

    let body: {
      amount?: number;
      currency?: string;
      receipt?: string;
      notes?: Record<string, string>;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { amount, currency = "INR", receipt, notes } = body;

    // Validate amount
    if (typeof amount !== "number" || isNaN(amount)) {
      return NextResponse.json(
        { error: "Amount must be a valid number in paise." },
        { status: 400 }
      );
    }

    // Minimum amount: 100 paise (₹1.00)
    if (amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const orderReceipt = receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Call Razorpay API to create the order
    try {
      const order = await razorpayInstance.orders.create({
        amount: Math.round(amount),
        currency: currency.toUpperCase(),
        receipt: orderReceipt,
        notes: notes || {},
      });

      return NextResponse.json({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (razorpayErr: unknown) {
      const err = razorpayErr as { statusCode?: number; error?: { description?: string; code?: string } };
      console.error("[Razorpay create-order] API Error:", razorpayErr);

      if (err?.statusCode === 401) {
        return NextResponse.json(
          { error: "Authentication with Razorpay failed. Please check your API credentials." },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: err?.error?.description || "Failed to create Razorpay order.",
          code: err?.error?.code,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Razorpay create-order] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing order creation." },
      { status: 500 }
    );
  }
}
