import { useState, useEffect, useCallback } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

const STORAGE_KEY = "bonggy_cookie_consent";

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    if (stored) {
      setStatus(stored);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setStatus("accepted");
    loadRb2b();
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setStatus("declined");
  }, []);

  return { status, accept, decline };
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
