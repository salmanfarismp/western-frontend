import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to cancel your order." },
        { status: 401 }
      );
    }

    let body: { orderId?: number; reason?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { orderId } = body;
    if (!orderId || typeof orderId !== "number") {
      return NextResponse.json(
        { success: false, error: "Valid numeric order ID is required." },
        { status: 400 }
      );
    }

    // 1. Fetch the order and verify ownership
    const { data: order, error: fetchError } = await supabase
      .from("Order")
      .select("id, status, fulfillment, profile_id")
      .eq("id", orderId)
      .eq("profile_id", user.id)
      .maybeSingle();

    if (fetchError || !order) {
      return NextResponse.json(
        { success: false, error: "Order not found or access denied." },
        { status: 404 }
      );
    }

    // 2. Verify cancellation eligibility
    const cancellableStatuses = ["new", "accepted"];
    if (!order.status || !cancellableStatuses.includes(order.status.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Order cannot be cancelled because it is already ${order.status}. Please contact our concierge support for assistance.`,
        },
        { status: 400 }
      );
    }

    // 3. Update order status and fulfillment to cancelled
    const { error: updateError } = await supabase
      .from("Order")
      .update({
        status: "cancelled",
        fulfillment: "cancelled",
      })
      .eq("id", orderId)
      .eq("profile_id", user.id);

    if (updateError) {
      console.error("[POST /api/orders/cancel] Update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update order status." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order #WS-${orderId} has been successfully cancelled.`,
    });
  } catch (err) {
    console.error("[POST /api/orders/cancel] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing cancellation." },
      { status: 500 }
    );
  }
}
