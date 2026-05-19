"use client";

import { useState, useEffect, useCallback } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

const STORAGE_KEY = "bonggy_cookie_consent";

export function useCookieConsent() {
  // `mounted` gates display until the client has had a chance to read localStorage.
  // Prevents the banner from flashing for users who've already chosen.
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
      if (stored === "accepted" || stored === "declined") {
        setStatus(stored);
      }
    } catch {
      // localStorage may be unavailable (private mode, etc.) — treat as pending
    }
    setMounted(true);
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setStatus("accepted");
    loadRb2b();
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setStatus("declined");
  }, []);

  return { status, accept, decline, mounted };
}

function loadRb2b() {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/QOQRJH95MW62/QOQRJH95MW62.js.gz";
  document.head.appendChild(s);
}

declare global {
  interface Window {
    reb2b?: { loaded: boolean };
  }
}
