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
        { success: false, error: "Authentication required to update address." },
        { status: 401 }
      );
    }

    let body: {
      name?: string;
      phone?: string;
      address_line1?: string;
      address_line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
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
      name,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country = "India",
    } = body;

    if (!address_line1?.trim() || !city?.trim() || !postal_code?.trim()) {
      return NextResponse.json(
        { success: false, error: "Address line 1, city, and postal code are required." },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {
      address_line1: address_line1.trim(),
      address_line2: address_line2?.trim() || null,
      city: city.trim(),
      state: state?.trim() || null,
      postal_code: postal_code.trim(),
      country: country.trim() || "India",
    };

    if (name?.trim()) updates.name = name.trim();
    if (phone?.trim()) {
      updates.phone = phone.trim();
      updates.contact_phone = phone.trim();
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from("Profile")
      .update(updates)
      .eq("id", user.id)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error("[Profile Address] Update error:", updateError);
      return NextResponse.json(
        { success: false, error: updateError.message || "Failed to update profile address." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Delivery address updated successfully.",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("[Profile Address] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while updating address." },
      { status: 500 }
    );
  }
}
