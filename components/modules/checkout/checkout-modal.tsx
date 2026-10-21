"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Truck,
  Sparkles,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  MapPin,
  Check,
  Edit3,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { loadRazorpayScript, type RazorpayOptions, type RazorpaySuccessResponse, type RazorpayFailedResponse } from "@/lib/razorpay/client";
import { SafeImage } from "@/components/ui/safe-image";

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CheckoutModal({ isOpen: propIsOpen, onClose: propOnClose }: CheckoutModalProps = {}) {
  const { user, profile, openAuthModal, refreshProfile } = useAuth();
  const {
    items,
    subtotal,
    cartId,
    clearCart,
    closeCart,
    isCheckoutOpen,
    closeCheckout,
  } = useCart();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isCheckoutOpen;
  const onClose = propOnClose || closeCheckout;

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Address Selection State
  const hasSavedAddress = Boolean(
    profile?.address_line1 && profile?.city && profile?.postal_code
  );
  const [deliveryMode, setDeliveryMode] = useState<"saved" | "new">("saved");
  const [saveAddressAsDefault, setSaveAddressAsDefault] = useState(true);

  // UI state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    orderId: string;
    paymentId: string;
    dbOrderId?: number | null;
    totalPaid: number;
    deliveryTo: string;
  } | null>(null);

  // Enforce auth check if opened without user
  useEffect(() => {
    if (isOpen && !user) {
      onClose();
      openAuthModal({
        title: "Sign In to Checkout",
        description: "Please sign in with Google to complete your purchase and save your delivery details.",
      });
    }
  }, [isOpen, user, onClose, openAuthModal]);

  // Synchronize initial delivery mode when profile loads
  useEffect(() => {
    if (hasSavedAddress) {
      setDeliveryMode("saved");
    } else {
      setDeliveryMode("new");
    }
  }, [hasSavedAddress]);

  // Auto-fill form values from profile or auth
  useEffect(() => {
    if (profile) {
      if (profile.name) setName(profile.name);
      if (profile.email) setEmail(profile.email);
      if (profile.phone || profile.contact_phone) {
        setPhone(profile.phone || profile.contact_phone || "");
      }
      if (profile.address_line1) setAddressLine1(profile.address_line1);
      if (profile.address_line2) setAddressLine2(profile.address_line2);
      if (profile.city) setCity(profile.city);
      if (profile.state) setState(profile.state);
      if (profile.postal_code) setPostalCode(profile.postal_code);
    } else if (user) {
      if (user.user_metadata?.full_name) setName(user.user_metadata.full_name);
      if (user.email) setEmail(user.email);
    }
  }, [profile, user]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setErrorMessage(null);
      setSuccessData(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim() || !phone.trim() || !addressLine1.trim() || !city.trim() || !postalCode.trim()) {
      setErrorMessage("Please complete all required shipping fields before continuing.");
      return;
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      setErrorMessage("Razorpay Key ID is not configured. Please check environment variables.");
      return;
    }

    const amountInPaise = Math.round(subtotal * 100);
    if (amountInPaise < 100) {
      setErrorMessage("Order amount must be at least ₹1.00.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Ensure Razorpay SDK script is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay payment gateway. Please check your internet connection.");
      }

      // 2. Call backend endpoint to create order
      const createOrderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: {
            profile_id: user?.id || "",
            customer_name: name,
            customer_phone: phone,
          },
        }),
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to initiate order with Razorpay.");
      }

      // 3. Open Razorpay Standard Checkout Modal
      const options: RazorpayOptions = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Western Outdoor Living",
        description: `Order #${orderData.order_id.slice(-8)}`,
        order_id: orderData.order_id,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: {
          color: "#2d4438", // brand primary / moss deep
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setErrorMessage("Payment was cancelled. You have not been charged.");
          },
        },
        handler: async (response: RazorpaySuccessResponse) => {
          setIsProcessing(true);
          try {
            // 4. Send signature and details to backend for verification
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                saveAddress: deliveryMode === "new" ? saveAddressAsDefault : false,
                customerName: name.trim(),
                shipping: {
                  address_line1: addressLine1.trim(),
                  address_line2: addressLine2.trim() || null,
                  city: city.trim(),
                  state: state.trim() || null,
                  postal_code: postalCode.trim(),
                  country: "India",
                  contact_phone: phone.trim(),
                },
                cartItems: items.map((i) => ({
                  productId: i.productId,
                  name: i.name,
                  price: i.price,
                  quantity: i.quantity,
                })),
                totalAmount: subtotal,
                profileId: user?.id || null,
                cartId: cartId || undefined,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment signature verification failed.");
            }

            // 5. Success! Snapshot receipt values before clearing cart
            const paidAmount = subtotal;
            const deliverySnapshot = `${name.trim()}, ${city.trim()} (${postalCode.trim()})`;

            if (deliveryMode === "new" && saveAddressAsDefault) {
              try {
                await refreshProfile();
              } catch (refreshErr) {
                console.warn("Could not refresh profile after order:", refreshErr);
              }
            }
            await clearCart();
            closeCart(); // close cart sidebar if open

            setSuccessData({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              dbOrderId: verifyData.db_order_id,
              totalPaid: paidAmount,
              deliveryTo: deliverySnapshot,
            });
          } catch (verifyErr: unknown) {
            const err = verifyErr as Error;
            setErrorMessage(err.message || "An error occurred during payment verification.");
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", (failedRes: RazorpayFailedResponse) => {
        setIsProcessing(false);
        const reason = failedRes.error?.description || "Payment failed. Please try another payment method.";
        setErrorMessage(reason);
      });

      razorpayInstance.open();
    } catch (err: unknown) {
      const e = err as Error;
      setIsProcessing(false);
      setErrorMessage(e.message || "An unexpected error occurred while starting checkout.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isProcessing) onClose();
        }}
        className="fixed inset-0 bg-espresso-rich/60 backdrop-blur-sm transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] bg-surface-card rounded-2xl shadow-2xl flex flex-col z-10 border border-border-subtle overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-surface-cream/50">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-primary-container" />
            <h2 id="checkout-modal-title" className="font-serif text-lg sm:text-xl font-semibold text-espresso-rich">
              {successData ? "Order Confirmed" : "Secure Checkout"}
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close modal"
            className="p-1.5 text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {successData ? (
            /* SUCCESS CELEBRATION VIEW */
            <div className="py-6 flex flex-col items-center text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-container bg-primary-container/10 px-3 py-1 rounded-full">
                  Payment Successful
                </span>
                <h3 className="font-serif text-2xl font-bold text-espresso-rich pt-1">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-mineral max-w-md mx-auto leading-relaxed">
                  Your luxury outdoor swing order has been confirmed. Our master craftspeople will begin preparing your order with white-glove care.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="w-full max-w-md bg-canvas-linen p-4 rounded-xl border border-border-subtle text-left space-y-2 text-xs text-espresso-rich">
                <div className="flex justify-between py-1 border-b border-border-subtle/60">
                  <span className="text-neutral-mineral">Order Reference</span>
                  <span className="font-mono font-bold text-espresso-rich">
                    {successData.dbOrderId ? `#WS-${successData.dbOrderId}` : successData.orderId}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle/60">
                  <span className="text-neutral-mineral">Payment Reference</span>
                  <span className="font-mono font-medium text-neutral-mineral">{successData.paymentId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle/60">
                  <span className="text-neutral-mineral">Delivery To</span>
                  <span className="font-medium text-right line-clamp-1 max-w-[220px]">
                    {successData.deliveryTo}
                  </span>
                </div>
                <div className="flex justify-between py-1 font-semibold text-primary-container">
                  <span>Total Paid</span>
                  <span>₹{successData.totalPaid.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-surface-card hover:bg-moss-deep text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <span>View Your Orders</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-border-subtle text-xs font-semibold text-espresso-rich hover:bg-surface-cream transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form id="checkout-form" onSubmit={handlePay} className="space-y-6">
              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-terracotta-soft/10 border border-terracotta-soft/30 flex items-start gap-2.5 text-xs text-terracotta-rich animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* Order Snapshot */}
              <div className="bg-canvas-linen/70 p-4 rounded-xl border border-border-subtle space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-espresso-rich">
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-primary-container" />
                    <span>Order Summary ({items.length} item{items.length !== 1 ? "s" : ""})</span>
                  </div>
                  <span className="font-serif font-bold text-sm">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="max-h-36 overflow-y-auto divide-y divide-border-subtle/60 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between gap-3 text-xs first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-surface-card shrink-0 border border-border-subtle">
                          <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-espresso-rich truncate text-[11px]">{item.name}</p>
                          <p className="text-[10px] text-neutral-mineral">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-serif font-semibold text-espresso-rich shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-semibold text-espresso-rich flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-primary-container" />
                    Shipping & Delivery Details
                  </h3>
                  <span className="text-[10px] text-primary-container font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-terracotta-soft" />
                    Complimentary White-Glove
                  </span>
                </div>

                {/* If user has a saved address, show selection options */}
                {hasSavedAddress && (
                  <div className="space-y-2.5">
                    {deliveryMode === "saved" ? (
                      <div className="p-4 rounded-xl border-2 border-primary-container/40 bg-primary-container/[0.03] space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px]">
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="text-xs font-bold text-espresso-rich">
                              Deliver to Saved Address
                            </span>
                            <span className="text-[10px] font-semibold text-primary-container bg-primary-container/10 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDeliveryMode("new");
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-container hover:underline cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Change / Edit</span>
                          </button>
                        </div>

                        <div className="text-xs text-espresso-rich pl-6 space-y-0.5">
                          <p className="font-semibold">{name || profile?.name}</p>
                          <p className="text-neutral-mineral">
                            {profile?.address_line1}
                            {profile?.address_line2 ? `, ${profile.address_line2}` : ""}
                          </p>
                          <p className="text-neutral-mineral">
                            {profile?.city}, {profile?.state ? `${profile.state} - ` : ""}{profile?.postal_code}
                          </p>
                          <p className="text-[11px] text-neutral-mineral pt-0.5">
                            Phone: {phone || profile?.contact_phone || profile?.phone}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-cream border border-border-subtle">
                        <span className="text-xs text-espresso-rich font-medium">
                          Using alternate delivery address
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (profile) {
                              if (profile.name) setName(profile.name);
                              if (profile.phone || profile.contact_phone) setPhone(profile.phone || profile.contact_phone || "");
                              if (profile.address_line1) setAddressLine1(profile.address_line1);
                              if (profile.address_line2) setAddressLine2(profile.address_line2);
                              if (profile.city) setCity(profile.city);
                              if (profile.state) setState(profile.state);
                              if (profile.postal_code) setPostalCode(profile.postal_code);
                            }
                            setDeliveryMode("saved");
                          }}
                          className="text-xs font-semibold text-primary-container hover:underline cursor-pointer"
                        >
                          Use saved address instead
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Form fields: Shown if deliveryMode === 'new' or if !hasSavedAddress */}
                {(!hasSavedAddress || deliveryMode === "new") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-espresso-rich">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="For digital invoice and tracking updates"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-espresso-rich">Address Line 1 *</label>
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="House / Flat / Villa No., Building Name, Street"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-espresso-rich">Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Landmark, Area, Estate"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai, Bengaluru"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Maharashtra, Karnataka"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="6-digit PIN code"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-espresso-rich">Country</label>
                      <input
                        type="text"
                        disabled
                        value="India"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border-subtle bg-surface-cream text-neutral-mineral cursor-not-allowed"
                      />
                    </div>

                    {/* Checkbox to save address to profile */}
                    <div className="sm:col-span-2 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={saveAddressAsDefault}
                          onChange={(e) => setSaveAddressAsDefault(e.target.checked)}
                          className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-border-subtle cursor-pointer accent-primary-container"
                        />
                        <span className="text-xs text-espresso-rich font-medium">
                          Save this address to my profile as default delivery address
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer with Payment Trigger */}
        {!successData && (
          <div className="px-6 py-4 border-t border-border-subtle bg-surface-cream/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-mineral">
              <ShieldCheck className="w-4 h-4 text-primary-container" />
              <span>Razorpay 256-bit Encrypted SSL</span>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border-subtle text-xs font-semibold text-espresso-rich hover:bg-surface-cream transition-colors disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing || items.length === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary-container hover:bg-moss-deep text-surface-card text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay ₹{subtotal.toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
