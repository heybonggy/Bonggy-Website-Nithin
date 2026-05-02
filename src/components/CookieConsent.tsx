import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const { status, accept, decline } = useCookieConsent();

  if (status !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
      <div className="max-w-[720px] mx-auto bg-bonggy-surface border border-bonggy-border rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">
            We use cookies to understand how visitors interact with our site and improve your experience. 
            By clicking Accept, you agree to our{" "}
            <a href="/privacy" className="text-bonggy-accent hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-md text-[13px] text-bonggy-text-secondary border border-bonggy-border hover:border-bonggy-border-hover hover:text-bonggy-text-primary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 rounded-md text-[13px] font-medium bg-bonggy-text-primary text-bonggy-surface hover:opacity-85 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
