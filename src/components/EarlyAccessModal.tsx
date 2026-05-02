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
import { Quote } from "lucide-react";

interface EarlyAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EarlyAccessModal({ open, onOpenChange }: EarlyAccessModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    problem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend here
    console.log("Early access request:", form);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-bonggy-surface border-bonggy-border text-bonggy-text-primary sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="font-serif-display text-[24px] md:text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-bonggy-text-primary">
            Early Access
          </DialogTitle>
          <DialogDescription className="text-bonggy-text-secondary text-[14px] leading-[1.5]">
            For teams who are done waiting for better outbound.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-4 space-y-4">
            <div className="bg-bonggy-bg border border-bonggy-border rounded-xl p-6">
              <Quote size={20} className="text-bonggy-accent mb-3" />
              <p className="text-[16px] md:text-[18px] text-bonggy-text-primary leading-[1.6] font-serif-display mb-4">
                &ldquo;We appreciate you coming this far to try us out. We will be in touch soon.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-bonggy-text-tertiary">—</span>
                <div>
                  <p className="text-[13px] text-bonggy-text-primary font-medium">Team Bonggy</p>
                  <p className="text-[11px] text-bonggy-text-tertiary">We lived the struggle. So we built the fix.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-5">
            <div className="bg-bonggy-bg border border-bonggy-border rounded-xl p-5 space-y-3">
              <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">
                We built Bonggy because we were tired of watching great reps burn out on bad data. The best SDR we ever hired quit because she spent 70% of her week researching and 30% selling. That is not a talent problem. That is a tooling problem.
              </p>
              <p className="text-[14px] text-bonggy-text-secondary leading-[1.6]">
                We are opening early access because the teams we have shown this to would not stop asking for it. We are rolling this out in waves. Not because we want to gatekeep, but because we would rather onboard ten teams properly than a hundred poorly.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[13px] text-bonggy-text-tertiary">—</span>
                <div>
                  <p className="text-[13px] text-bonggy-text-primary font-medium">Team Bonggy</p>
                  <p className="text-[11px] text-bonggy-text-tertiary">We lived the struggle. So we built the fix.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ea-name" className="text-[13px] text-bonggy-text-primary">
                    Name
                  </Label>
                  <Input
                    id="ea-name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    className="bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ea-email" className="text-[13px] text-bonggy-text-primary">
                    Email
                  </Label>
                  <Input
                    id="ea-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    className="bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ea-company" className="text-[13px] text-bonggy-text-primary">
                  Company
                </Label>
                <Input
                  id="ea-company"
                  required
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Company name"
                  className="bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ea-problem" className="text-[13px] text-bonggy-text-primary">
                  What are you looking to solve?
                </Label>
                <Textarea
                  id="ea-problem"
                  required
                  value={form.problem}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  placeholder="Tell us about your outbound workflow and where it breaks..."
                  rows={4}
                  className="bg-bonggy-bg border-bonggy-border text-bonggy-text-primary placeholder:text-bonggy-text-tertiary focus-visible:border-bonggy-accent focus-visible:ring-bonggy-accent/30 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-bonggy-accent text-bonggy-surface hover:bg-bonggy-accent-hover transition-colors font-medium"
              >
                Request Early Access
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
