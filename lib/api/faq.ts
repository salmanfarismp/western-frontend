import { supabase } from "./client";
import type { FaqRow } from "@/types/database";
import type { FaqItem } from "@/types/faq";
import { HOME_FAQS } from "@/lib/seo/home-schema";

export const DEFAULT_FAQS: FaqItem[] = HOME_FAQS;

/**
 * Fetch all active FAQs from Supabase ordered by id ascending.
 * Falls back to DEFAULT_FAQS if no records exist or if an error occurs.
 */
export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const { data, error } = await supabase
      .from("Faq")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      console.error("Failed to fetch Faq records from Supabase:", error);
      return DEFAULT_FAQS;
    }

    const rows = (data as FaqRow[]) || [];
    const validFaqs: FaqItem[] = rows
      .filter(
        (row) =>
          Boolean(row.question && row.question.trim().length > 0) &&
          Boolean(row.answer && row.answer.trim().length > 0)
      )
      .map((row) => ({
        id: row.id,
        question: row.question!.trim(),
        answer: row.answer!.trim(),
      }));

    if (validFaqs.length > 0) {
      return validFaqs;
    }

    return DEFAULT_FAQS;
  } catch (err) {
    console.error("Unexpected error in getFaqs:", err);
    return DEFAULT_FAQS;
  }
}
