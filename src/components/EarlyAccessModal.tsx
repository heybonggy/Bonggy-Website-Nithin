import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ─── Replace this with your Google Apps Script Web App URL ───
// Setup instructions:
// 1. Create a Google Sheet. Row 1 headers: Timestamp | Name | Email | Company | Problem
// 2. Extensions → Apps Script. Paste the script below. Deploy as Web App (Execute as: Me, Access: Anyone).
// 3. Copy the Web App URL and paste it here.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdGEKeBiSF4ErB1gKENvNpXwyiYzdJWHeLoZmNlq1nrkTlLHbOh2SdR3DUSn0FYKlvVA/exec";

/*
─── Google Apps Script ───
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.company || "",
      data.problem || "",
    ]);
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

interface EarlyAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EarlyAccessModal({ open, onOpenChange }: EarlyAccessModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    problem: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-bonggy-surface border-bonggy-border text-bonggy-text-primary sm:max-w-[640px] p-6 md:p-8">
        <DialogHeader className="text-left">
          <DialogTitle className="font-serif-display text-[22px] md:text-[26px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary">
            Early Access
          </DialogTitle>
          <DialogDescription className="text-bonggy-text-secondary text-[13px] leading-[1.5]">
            For teams who are done waiting for better outbound.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-4">
            <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">
              We appreciate you coming this far. We will be in touch soon.
            </p>
            <p className="text-[13px] text-bonggy-text-primary font-medium mt-3">— Team Bonggy</p>
          </div>
        ) : (
          <div className="mt-3 space-y-4">
            <p className="text-[13px] text-bonggy-text-secondary leading-[1.6]">
              We built Bonggy because great reps should not burn out on bad data. Early access is rolling out in waves — not to gatekeep, but because we would rather onboard ten teams properly than a hundred poorly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ea-name" className="text-[12px] text-bonggy-text-primary">
                    Name
                  </Label>
                  <Input
                    id="ea-name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    className="h-8 text-[13px] bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="ea-email" className="text-[12px] text-bonggy-text-primary">
                    Email
                  </Label>
                  <Input
                    id="ea-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    className="h-8 text-[13px] bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ea-company" className="text-[12px] text-bonggy-text-primary">
                  Company
                </Label>
                <Input
                  id="ea-company"
                  required
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Company name"
                  className="h-8 text-[13px] bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="ea-problem" className="text-[12px] text-bonggy-text-primary">
                  What are you looking to solve?
                </Label>
                <Textarea
                  id="ea-problem"
                  required
                  value={form.problem}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  placeholder="Tell us where your outbound workflow breaks..."
                  rows={2}
                  className="text-[13px] bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-[#5cb82e] focus-visible:ring-[#5cb82e]/30 resize-none min-h-0"
                />
              </div>

              {error && (
                <p className="text-[12px] text-red-400">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-bonggy-accent text-white hover:bg-bonggy-accent-hover transition-colors font-medium text-[13px] h-9 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Request Early Access"}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
