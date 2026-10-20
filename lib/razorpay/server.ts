import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.warn("[Razorpay] Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set in environment.");
}

export const razorpayInstance = new Razorpay({
  key_id: keyId || "",
  key_secret: keySecret || "",
});
