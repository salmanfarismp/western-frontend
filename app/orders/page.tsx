"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  FileText,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Loader2,
  X,
  CreditCard,
  Edit3,
  ArrowRight,
  Printer,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { SafeImage } from "@/components/ui/safe-image";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import type { CustomerOrder } from "@/types/order";

type FilterTab = "all" | "active" | "delivered" | "cancelled";

export default function CustomerOrdersPage() {
  const { user, profile, isLoading: isAuthLoading, openAuthModal, refreshProfile } = useAuth();
  const { addToCart, openCart } = useCart();

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  // Filter & Search state
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modals state
  const [cancellingOrder, setCancellingOrder] = useState<CustomerOrder | null>(null);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const [receiptOrder, setReceiptOrder] = useState<CustomerOrder | null>(null);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState<boolean>(false);
  const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);
  const [addressSaveSuccess, setAddressSaveSuccess] = useState<string | null>(null);
  const [addressSaveError, setAddressSaveError] = useState<string | null>(null);

  // Address edit form
  const [editName, setEditName] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [editAddress1, setEditAddress1] = useState<string>("");
  const [editAddress2, setEditAddress2] = useState<string>("");
  const [editCity, setEditCity] = useState<string>("");
  const [editState, setEditState] = useState<string>("");
  const [editPostalCode, setEditPostalCode] = useState<string>("");

  // Sync profile into address edit modal state
  useEffect(() => {
    if (profile) {
      setEditName(profile.name || "");
      setEditPhone(profile.phone || profile.contact_phone || "");
      setEditAddress1(profile.address_line1 || "");
      setEditAddress2(profile.address_line2 || "");
      setEditCity(profile.city || "");
      setEditState(profile.state || "");
      setEditPostalCode(profile.postal_code || "");
    }
  }, [profile]);

  // Load authenticated customer orders
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setIsLoadingOrders(true);
    setOrdersError(null);

    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      const e = err as Error;
      setOrdersError(e.message || "Failed to fetch orders");
    } finally {
      setIsLoadingOrders(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      void fetchOrders();
    } else if (!isAuthLoading) {
      setIsLoadingOrders(false);
    }
  }, [user, isAuthLoading, fetchOrders]);

  // Copy order ID helper
  const handleCopyId = (id: number) => {
    navigator.clipboard.writeText(`#WS-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tab filter
      const status = (order.status || "").toLowerCase();
      if (activeTab === "active" && !["new", "accepted", "shipped"].includes(status)) {
        return false;
      }
      if (activeTab === "delivered" && status !== "delivered") {
        return false;
      }
      if (activeTab === "cancelled" && status !== "cancelled") {
        return false;
      }

      // Search query filter (Order # or Item names)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesRef = order.orderReference.toLowerCase().includes(query) || String(order.id).includes(query);
        const matchesItem = order.items.some((item) => item.name.toLowerCase().includes(query));
        return matchesRef || matchesItem;
      }

      return true;
    });
  }, [orders, activeTab, searchQuery]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: orders.length,
      active: orders.filter((o) => ["new", "accepted", "shipped"].includes((o.status || "").toLowerCase())).length,
      delivered: orders.filter((o) => (o.status || "").toLowerCase() === "delivered").length,
      cancelled: orders.filter((o) => (o.status || "").toLowerCase() === "cancelled").length,
    };
  }, [orders]);

  // Handle Order Cancellation
  const handleConfirmCancel = async () => {
    if (!cancellingOrder) return;
    setIsCancelling(true);
    setCancelError(null);

    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: cancellingOrder.id }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to cancel order");
      }

      // Update local order status
      setOrders((prev) =>
        prev.map((o) =>
          o.id === cancellingOrder.id
            ? { ...o, status: "cancelled", fulfillment: "cancelled" }
            : o
        )
      );

      setCancellingOrder(null);
    } catch (err) {
      const e = err as Error;
      setCancelError(e.message || "Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  // Handle Address Save
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAddress(true);
    setAddressSaveError(null);
    setAddressSaveSuccess(null);

    try {
      const res = await fetch("/api/profile/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          address_line1: editAddress1,
          address_line2: editAddress2,
          city: editCity,
          state: editState,
          postal_code: editPostalCode,
          country: "India",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save address");
      }

      await refreshProfile();
      setAddressSaveSuccess("Address updated successfully.");
      setTimeout(() => {
        setIsEditAddressOpen(false);
        setAddressSaveSuccess(null);
      }, 1200);
    } catch (err) {
      const e = err as Error;
      setAddressSaveError(e.message || "Failed to update address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Reorder Item helper
  const handleReorder = async (productId: string) => {
    if (!productId) return;
    await addToCart(productId, 1);
    openCart();
  };

  // Status Badge Helper
  const renderStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Order Confirmed</span>
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-container/10 text-primary-container border border-primary-container/20">
            <Package className="w-3.5 h-3.5 text-primary-container" />
            <span>Processing</span>
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Dispatched / White-Glove Transit</span>
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-terracotta-soft/15 text-terracotta-rich border border-terracotta-soft/30">
            <AlertCircle className="w-3.5 h-3.5 text-terracotta-rich" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-cream text-neutral-mineral border border-border-subtle">
            <Package className="w-3.5 h-3.5" />
            <span className="capitalize">{status}</span>
          </span>
        );
    }
  };

  // 4-Stage Visual Order Stepper
  const renderOrderStepper = (status: string) => {
    const s = status.toLowerCase();
    if (s === "cancelled") {
      return (
        <div className="p-3.5 rounded-xl bg-terracotta-soft/10 border border-terracotta-soft/25 flex items-center gap-2.5 text-xs text-terracotta-rich">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>This order was cancelled. A refund to your original payment method is processed.</span>
        </div>
      );
    }

    const stages = [
      { key: "new", label: "Order Placed", step: 1 },
      { key: "accepted", label: "Processing", step: 2 },
      { key: "shipped", label: "Dispatched", step: 3 },
      { key: "delivered", label: "Delivered", step: 4 },
    ];

    const getStageIndex = () => {
      switch (s) {
        case "new":
          return 1;
        case "accepted":
          return 2;
        case "shipped":
          return 3;
        case "delivered":
          return 4;
        default:
          return 1;
      }
    };

    const currentStageIndex = getStageIndex();

    return (
      <div className="py-2">
        <div className="relative flex items-center justify-between">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-border-subtle rounded-full -z-0" />
          {/* Active Progress Bar Fill */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-container rounded-full transition-all duration-500 -z-0"
            style={{
              width: `${((currentStageIndex - 1) / (stages.length - 1)) * 100}%`,
            }}
          />

          {stages.map((stage) => {
            const isCompleted = currentStageIndex > stage.step;
            const isCurrent = currentStageIndex === stage.step;

            return (
              <div key={stage.key} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? "bg-primary-container text-white"
                      : isCurrent
                      ? "bg-primary-container text-white ring-4 ring-primary-container/20"
                      : "bg-surface-card border-2 border-border-subtle text-neutral-mineral"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : stage.step}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-medium mt-1.5 text-center ${
                    isCurrent
                      ? "text-primary-container font-bold"
                      : isCompleted
                      ? "text-espresso-rich"
                      : "text-neutral-mineral"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* Return unified page layout with Header (AnnouncementBar + Navbar), Main Content, and Footer */
  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar showSearch={false} />

      {/* Main Content Area */}
      <main className="flex-1 w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {isAuthLoading || (isLoadingOrders && user) ? (
          /* Loading State */
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="h-6 w-32 bg-border-subtle/50 rounded-md animate-pulse" />
            <div className="h-10 w-64 bg-border-subtle/50 rounded-md animate-pulse" />
            <div className="space-y-4 pt-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-surface-card border border-border-subtle p-6 animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : !user ? (
          /* Unauthenticated State: Sign In Gate */
          <div className="max-w-2xl mx-auto text-center space-y-8 bg-surface-card p-8 sm:p-12 rounded-3xl border border-border-subtle shadow-sm animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary-container bg-primary-container/10 px-3 py-1 rounded-full">
                Customer Portal
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-rich">
                Track Your Swing chairs
              </h1>
              <p className="text-sm text-neutral-mineral max-w-md mx-auto leading-relaxed">
                Sign in with your Google account to view real-time workshop crafting updates, access digital invoices, and manage your delivery addresses.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  openAuthModal({
                    title: "Sign In to Westernswings",
                    description:
                      "Sign in with Google to view your order history and manage delivery preferences.",
                    nextUrl: "/orders",
                  })
                }
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-container hover:bg-moss-deep text-surface-card text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>Continue with Google</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-6 border-t border-border-subtle/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-mineral">
              <div className="flex items-center justify-center gap-1.5">
                <Truck className="w-4 h-4 text-primary-container" />
                <span>Insured Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary-container" />
                <span>10-Year Craft Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-primary-container" />
                <span>Concierge Care</span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Customer Orders Dashboard */
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-mineral">
          <Link href="/" className="hover:text-espresso-rich transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-espresso-rich font-medium">My Orders</span>
        </nav>

        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border-subtle/80">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-container">
              Customer Account
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-rich pt-1">
              My Orders & Deliveries
            </h1>
            <p className="text-xs sm:text-sm text-neutral-mineral pt-1.5">
              Review active workshop progress, past purchases, and verified delivery receipts.
            </p>
          </div>

          {/* Saved Address Pill / Action */}
          <button
            onClick={() => setIsEditAddressOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle hover:border-primary-container/40 text-xs font-semibold text-espresso-rich transition-all shadow-xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-primary-container" />
            <span>Manage Saved Address</span>
            <Edit3 className="w-3.5 h-3.5 text-neutral-mineral" />
          </button>
        </div>

        {/* Saved Default Address Summary Banner (If present) */}
        {profile?.address_line1 && (
          <div className="bg-surface-card rounded-2xl p-4 sm:p-5 border border-border-subtle shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-espresso-rich">
                    {profile.name || "Default Shipping Address"}
                  </span>
                  <span className="text-[10px] font-semibold text-primary-container bg-primary-container/10 px-2 py-0.5 rounded-full">
                    Active Default
                  </span>
                </div>
                <p className="text-neutral-mineral">
                  {profile.address_line1}
                  {profile.address_line2 ? `, ${profile.address_line2}` : ""},{" "}
                  {profile.city}, {profile.state ? `${profile.state} - ` : ""}
                  {profile.postal_code}
                </p>
                <p className="text-[11px] text-neutral-mineral pt-0.5">
                  Contact: {profile.contact_phone || profile.phone || "Not set"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditAddressOpen(true)}
              className="text-xs font-semibold text-primary-container hover:underline self-end sm:self-center shrink-0 cursor-pointer"
            >
              Edit Address
            </button>
          </div>
        )}

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-cream/80 rounded-xl border border-border-subtle/80 overflow-x-auto">
            {(
              [
                { key: "all", label: "All Orders", count: tabCounts.all },
                { key: "active", label: "In Progress", count: tabCounts.active },
                { key: "delivered", label: "Delivered", count: tabCounts.delivered },
                { key: "cancelled", label: "Cancelled", count: tabCounts.cancelled },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-surface-card text-espresso-rich shadow-xs"
                      : "text-neutral-mineral hover:text-espresso-rich"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-primary-container/10 text-primary-container font-bold"
                        : "bg-surface-cream text-neutral-mineral"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-mineral absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search by Order # or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container text-espresso-rich placeholder:text-neutral-mineral/70"
            />
          </div>
        </div>

        {/* Error Alert */}
        {ordersError && (
          <div className="p-4 rounded-2xl bg-terracotta-soft/10 border border-terracotta-soft/30 flex items-start gap-3 text-xs text-terracotta-rich">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to load orders</p>
              <p>{ordersError}</p>
            </div>
          </div>
        )}

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 px-4 bg-surface-card rounded-3xl border border-border-subtle shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-surface-cream text-neutral-mineral flex items-center justify-center mx-auto">
              <Package className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-espresso-rich">
                No orders found
              </h3>
              <p className="text-xs text-neutral-mineral max-w-sm mx-auto">
                {searchQuery
                  ? "No orders match your search query. Try clearing the filter."
                  : activeTab !== "all"
                  ? `You have no ${activeTab} orders at this moment.`
                  : "You haven't placed any orders yet. Discover our curated collection of outdoor swings."}
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-surface-card hover:bg-moss-deep text-xs font-semibold transition-all shadow-xs"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isCancellable = ["new", "accepted"].includes(
                (order.status || "").toLowerCase()
              );

              return (
                <div
                  key={order.id}
                  className="bg-surface-card rounded-2xl border border-border-subtle shadow-xs overflow-hidden transition-all hover:shadow-sm"
                >
                  {/* Order Card Header */}
                  <div className="px-5 py-4 border-b border-border-subtle/80 bg-surface-cream/40 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-espresso-rich">
                          {order.orderReference}
                        </span>
                        <button
                          onClick={() => handleCopyId(order.id)}
                          title="Copy Order ID"
                          className="p-1 text-neutral-mineral hover:text-espresso-rich rounded transition-colors cursor-pointer"
                        >
                          {copiedId === order.id ? (
                            <Check className="w-3.5 h-3.5 text-primary-container" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <span className="text-neutral-mineral/40">•</span>

                      <span className="text-xs text-neutral-mineral">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {renderStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Visual Stepper */}
                    {renderOrderStepper(order.status)}

                    {/* Order Items List */}
                    <div className="divide-y divide-border-subtle/60 border-t border-b border-border-subtle/60 py-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-3 flex items-center justify-between gap-4 first:pt-1 last:pb-1"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Link
                              href={item.slug ? `/product/${item.slug}` : "/collections"}
                              className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-cream shrink-0 border border-border-subtle"
                            >
                              <SafeImage
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </Link>

                            <div className="min-w-0">
                              <Link
                                href={item.slug ? `/product/${item.slug}` : "/collections"}
                                className="font-serif text-sm font-semibold text-espresso-rich hover:text-primary-container transition-colors line-clamp-1"
                              >
                                {item.name}
                              </Link>
                              <p className="text-xs text-neutral-mineral">
                                Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-serif font-bold text-sm text-espresso-rich">
                              ₹{item.totalPrice.toLocaleString("en-IN")}
                            </p>
                            {item.productId && (
                              <button
                                onClick={() => handleReorder(item.productId)}
                                className="text-[11px] font-semibold text-primary-container hover:underline cursor-pointer inline-flex items-center gap-1 pt-0.5"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Buy Again</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Logistics & Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-espresso-rich bg-surface-cream/50 p-4 rounded-xl border border-border-subtle/80">
                      {/* Shipping Info */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-mineral flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary-container" />
                          Delivery Destination
                        </span>
                        {order.shipping ? (
                          <div className="text-neutral-mineral leading-relaxed">
                            <p className="font-semibold text-espresso-rich">
                              {profile?.name || user.user_metadata?.full_name || "Customer"}
                            </p>
                            <p>
                              {order.shipping.addressLine1}
                              {order.shipping.addressLine2 ? `, ${order.shipping.addressLine2}` : ""}
                            </p>
                            <p>
                              {order.shipping.city}, {order.shipping.state ? `${order.shipping.state} - ` : ""}
                              {order.shipping.postalCode}
                            </p>
                            {order.shipping.contactPhone && (
                              <p className="text-[11px]">Phone: {order.shipping.contactPhone}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-neutral-mineral">White-glove delivery address recorded</p>
                        )}
                      </div>

                      {/* Payment & Total Amount */}
                      <div className="space-y-1 md:text-right">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-mineral flex md:justify-end items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-primary-container" />
                          Payment & Billing
                        </span>
                        <div className="leading-relaxed">
                          <p className="font-serif font-bold text-base text-primary-container">
                            Total: ₹{order.totalAmount.toLocaleString("en-IN")}
                          </p>
                          <p className="text-neutral-mineral">
                            {order.payment?.gateway === "online" ? "Online via Razorpay" : "Secured Gateway"} •{" "}
                            <span className="font-medium text-espresso-rich capitalize">
                              {order.payment?.status || "Paid"}
                            </span>
                          </p>
                          {order.payment?.gatewayPaymentId && (
                            <p className="text-[10px] text-neutral-mineral/80 font-mono">
                              Txn: {order.payment.gatewayPaymentId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Card Footer Actions */}
                  <div className="px-5 py-3.5 border-t border-border-subtle/80 bg-surface-cream/20 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReceiptOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border-subtle bg-surface-card hover:bg-surface-cream text-xs font-semibold text-espresso-rich transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-neutral-mineral" />
                        <span>View Invoice</span>
                      </button>

                      <a
                        href={`https://wa.me/916238473506?text=${encodeURIComponent(
                          `Hello Westernswings team, I have a question regarding my Order #${order.id}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border-subtle bg-surface-card hover:bg-surface-cream text-xs font-semibold text-espresso-rich transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-primary-container" />
                        <span>WhatsApp Help</span>
                        <ExternalLink className="w-3 h-3 text-neutral-mineral/70" />
                      </a>
                    </div>

                    <div>
                      {isCancellable && (
                        <button
                          onClick={() => {
                            setCancelError(null);
                            setCancellingOrder(order);
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-terracotta-rich hover:bg-terracotta-soft/10 transition-colors cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          </div>
        )}
      </main>

      {/* Unified Footer */}
      <Footer />

      {/* Floating Concierge Action */}
      <WhatsAppButton />

      {/* MODAL 1: ORDER CANCELLATION DIALOG */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            onClick={() => {
              if (!isCancelling) setCancellingOrder(null);
            }}
            className="fixed inset-0 bg-espresso-rich/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl p-6 border border-border-subtle z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-terracotta-rich">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-espresso-rich">
                  Cancel Order {cancellingOrder.orderReference}?
                </h3>
              </div>
              <button
                onClick={() => setCancellingOrder(null)}
                disabled={isCancelling}
                className="p-1 text-neutral-mineral hover:text-espresso-rich rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-mineral leading-relaxed">
              Are you sure you want to cancel this order? Since this order has not yet been dispatched from our workshop, your full payment of{" "}
              <strong className="text-espresso-rich">
                ₹{cancellingOrder.totalAmount.toLocaleString("en-IN")}
              </strong>{" "}
              will be refunded to your original payment method.
            </p>

            {cancelError && (
              <div className="p-3 rounded-xl bg-terracotta-soft/10 text-xs text-terracotta-rich border border-terracotta-soft/30">
                {cancelError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCancellingOrder(null)}
                disabled={isCancelling}
                className="px-4 py-2 text-xs font-semibold text-espresso-rich hover:bg-surface-cream rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-terracotta-rich hover:bg-terracotta-rich/90 text-surface-card text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <span>Yes, Cancel Order</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DIGITAL INVOICE / RECEIPT */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            onClick={() => setReceiptOrder(null)}
            className="fixed inset-0 bg-espresso-rich/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xl max-h-[90vh] bg-surface-card rounded-2xl shadow-2xl flex flex-col z-10 border border-border-subtle overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-surface-cream/50 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-container" />
                <h3 className="font-serif text-base font-semibold text-espresso-rich">
                  Digital Invoice Receipt
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-cream text-xs font-semibold text-espresso-rich transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-primary-container" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setReceiptOrder(null)}
                  className="p-1 text-neutral-mineral hover:text-espresso-rich rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Receipt Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-espresso-rich">
              {/* Brand Header */}
              <div className="flex items-start justify-between border-b border-border-subtle pb-5">
                <div>
                  <h4 className="font-serif text-xl font-bold text-espresso-rich">
                    Westernswings
                  </h4>
                  <p className="text-[11px] text-neutral-mineral">
                    Ayisha Complex, Panamaram, Wayanad-670721, Kerala
                  </p>
                  <p className="text-[11px] text-neutral-mineral">Phone: +91 6238473506</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-sm text-espresso-rich">
                    {receiptOrder.orderReference}
                  </p>
                  <p className="text-[11px] text-neutral-mineral">
                    {new Date(receiptOrder.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Billed To */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-mineral">
                  Delivered To
                </span>
                <p className="font-semibold">{profile?.name || user?.user_metadata?.full_name || "Customer"}</p>
                {receiptOrder.shipping && (
                  <p className="text-neutral-mineral">
                    {receiptOrder.shipping.addressLine1}
                    {receiptOrder.shipping.addressLine2 ? `, ${receiptOrder.shipping.addressLine2}` : ""},{" "}
                    {receiptOrder.shipping.city}, {receiptOrder.shipping.state} - {receiptOrder.shipping.postalCode}
                  </p>
                )}
              </div>

              {/* Items Table */}
              <div className="border border-border-subtle rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 bg-surface-cream/80 px-3 py-2 font-bold text-[11px] border-b border-border-subtle">
                  <span className="col-span-7">Item Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-3 text-right">Amount</span>
                </div>
                <div className="divide-y divide-border-subtle/60">
                  {receiptOrder.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 px-3 py-2.5 items-center">
                      <span className="col-span-7 font-medium line-clamp-1">{item.name}</span>
                      <span className="col-span-2 text-center text-neutral-mineral">{item.quantity}</span>
                      <span className="col-span-3 text-right font-serif font-semibold">
                        ₹{item.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="space-y-1.5 pt-2 border-t border-border-subtle text-right">
                <div className="flex justify-between text-neutral-mineral">
                  <span>White-Glove Shipping & Installation</span>
                  <span className="text-primary-container font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-espresso-rich pt-1 border-t border-border-subtle">
                  <span>Grand Total Paid</span>
                  <span>₹{receiptOrder.totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[10px] text-neutral-mineral pt-1">
                  Payment Mode: Online (Razorpay 256-bit SSL) • Status: Confirmed
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT DEFAULT SHIPPING ADDRESS */}
      {isEditAddressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            onClick={() => {
              if (!isSavingAddress) setIsEditAddressOpen(false);
            }}
            className="fixed inset-0 bg-espresso-rich/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg max-h-[90vh] bg-surface-card rounded-2xl shadow-2xl flex flex-col z-10 border border-border-subtle overflow-hidden">
            <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-surface-cream/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-container" />
                <h3 className="font-serif text-base font-semibold text-espresso-rich">
                  Manage Saved Delivery Address
                </h3>
              </div>
              <button
                onClick={() => setIsEditAddressOpen(false)}
                disabled={isSavingAddress}
                className="p-1 text-neutral-mineral hover:text-espresso-rich rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="flex-1 overflow-y-auto p-6 space-y-4">
              {addressSaveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-800 border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{addressSaveSuccess}</span>
                </div>
              )}

              {addressSaveError && (
                <div className="p-3 rounded-xl bg-terracotta-soft/10 text-xs text-terracotta-rich border border-terracotta-soft/30">
                  {addressSaveError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-espresso-rich">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Full recipient name"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-espresso-rich">Contact Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-espresso-rich">Address Line 1 *</label>
                  <input
                    type="text"
                    required
                    value={editAddress1}
                    onChange={(e) => setEditAddress1(e.target.value)}
                    placeholder="House/Villa No., Building Name, Street"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-espresso-rich">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={editAddress2}
                    onChange={(e) => setEditAddress2(e.target.value)}
                    placeholder="Landmark, Area, Estate"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso-rich">City *</label>
                  <input
                    type="text"
                    required
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso-rich">State *</label>
                  <input
                    type="text"
                    required
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso-rich">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={editPostalCode}
                    onChange={(e) => setEditPostalCode(e.target.value)}
                    placeholder="6-digit PIN"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-card focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso-rich">Country</label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-cream text-neutral-mineral cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsEditAddressOpen(false)}
                  disabled={isSavingAddress}
                  className="px-4 py-2 text-xs font-semibold text-espresso-rich hover:bg-surface-cream rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-primary-container hover:bg-moss-deep text-surface-card text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSavingAddress ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Address</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
