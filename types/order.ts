export interface CustomerOrderShipping {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  contactPhone: string;
}

export interface CustomerOrderPayment {
  id: string;
  gateway: string;
  gatewayPaymentId: string;
  gatewayOrderId: string;
  status: string;
  amount: number;
}

export interface CustomerOrderItem {
  id: number;
  productId: string;
  name: string;
  slug: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface CustomerOrder {
  id: number;
  orderReference: string;
  createdAt: string;
  status: "new" | "accepted" | "shipped" | "delivered" | "cancelled" | string;
  fulfillment: "active" | "cancelled" | "completed" | string;
  totalAmount: number;
  shipping: CustomerOrderShipping | null;
  payment: CustomerOrderPayment | null;
  items: CustomerOrderItem[];
}
