"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { X, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, authModalOptions, closeAuthModal, signInWithGoogle } =
    useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Reset state when opened
  useEffect(() => {
    if (isAuthModalOpen) {
      setIsSubmitting(false);
      setErrorMessage(null);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const title =
    authModalOptions?.title || "Sign In to Westernswings";
  const description =
    authModalOptions?.description ||
    "Sign in with Google to manage your orders, write reviews, and save delivery preferences.";

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await signInWithGoogle(authModalOptions?.nextUrl);
    } catch (err: unknown) {
      console.error("Sign in failed:", err);
      setIsSubmitting(false);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to connect with Google. Please check your connection and try again.",
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-rich/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Content */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-surface-cream border border-border-subtle flex items-center justify-center shadow-xs">
            <Sparkles className="w-6 h-6 text-primary-container" />
          </div>
          <h2
            id="auth-modal-title"
            className="font-serif text-xl sm:text-2xl font-bold text-espresso-rich tracking-tight"
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-mineral leading-relaxed px-2">
            {description}
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <div className="flex-1 font-medium leading-snug">{errorMessage}</div>
          </div>
        )}

        {/* Action Button: Google Sign-in */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            id="modal-google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full h-12 px-4 rounded-xl border border-border-subtle bg-surface-card hover:bg-surface-cream active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-sm font-semibold text-espresso-rich shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2 text-neutral-mineral">
                <svg
                  className="animate-spin h-5 w-5 text-primary-container"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Connecting with Google...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Security / Privacy reassurance */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-neutral-mineral">
          <ShieldCheck className="w-3.5 h-3.5 text-primary-container" />
          <span>Secure authentication via Google. No passwords stored.</span>
        </div>
      </div>
    </div>
  );
}
