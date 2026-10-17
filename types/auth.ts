export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  contact_phone?: string | null;
  created_at?: string;
}

export interface AuthModalOptions {
  title?: string;
  description?: string;
  nextUrl?: string;
  onSuccess?: () => void;
}
