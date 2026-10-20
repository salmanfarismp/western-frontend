"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import type { UserProfile, AuthModalOptions } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  displayName: string;
  avatarUrl: string | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalOptions: AuthModalOptions | null;
  signInWithGoogle: (next?: string) => Promise<void>;
  signOut: () => Promise<void>;
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalOptions, setAuthModalOptions] = useState<AuthModalOptions | null>(null);

  const fetchProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("Profile")
          .select("*")
          .eq("id", userId)
          .single();

        if (!error && data) {
          setProfile(data as UserProfile);
        }
      } catch (err) {
        console.warn("Could not load user profile:", err);
      }
    },
    [supabase],
  );

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          if (initialSession?.user) {
            void fetchProfile(initialSession.user.id);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to initialize auth session", err);
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          void fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const signInWithGoogle = async (next?: string) => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "";
    const currentPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/";
    const targetNext = next || currentPath;
    const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(targetNext)}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsLoading(false);
  };

  const openAuthModal = useCallback((options?: AuthModalOptions) => {
    setAuthModalOptions(options ?? null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthModalOptions(null);
  }, []);

  const displayName = useMemo(() => {
    if (profile?.name) return profile.name;
    const meta = user?.user_metadata;
    if (meta?.full_name) return meta.full_name as string;
    if (meta?.name) return meta.name as string;
    if (user?.email) return user.email.split("@")[0];
    return "Guest";
  }, [profile, user]);

  const avatarUrl = useMemo(() => {
    if (profile?.avatar_url) return profile.avatar_url;
    const meta = user?.user_metadata;
    if (meta?.avatar_url) return meta.avatar_url as string;
    if (meta?.picture) return meta.picture as string;
    return null;
  }, [profile, user]);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        displayName,
        avatarUrl,
        isLoading,
        isAuthModalOpen,
        authModalOptions,
        signInWithGoogle,
        signOut,
        openAuthModal,
        closeAuthModal,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
