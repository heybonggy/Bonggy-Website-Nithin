"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  Users,
  Target,
  Radio,
  Zap,
} from "lucide-react";

const steps = [
  { id: "company", label: "Company", icon: Building2 },
  { id: "team", label: "Team", icon: Users },
  { id: "icp", label: "ICP", icon: Target },
  { id: "connect", label: "Connect", icon: Radio },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [role, setRole] = useState("");
  const [icpSize, setIcpSize] = useState("");
  const [fundingStage, setFundingStage] = useState("");

  void steps[currentStep];
  const canProceed = currentStep > 0 || (companySize && industry);

  return (
    <div className="min-h-screen bg-bonggy-bg flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-bonggy-border bg-bonggy-surface">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bonggy-accent flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-[15px] font-semibold text-bonggy-text-primary">Bonggy</span>
        </div>
        <span className="text-[12px] text-bonggy-text-tertiary">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px]">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="flex-1 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors ${
                  i <= currentStep
                    ? "bg-bonggy-accent text-white"
                    : "bg-bonggy-border text-bonggy-text-tertiary"
                }`}>
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full ${
                    i < currentStep ? "bg-bonggy-accent" : "bg-bonggy-border"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-bonggy-surface border border-bonggy-border rounded-2xl p-8">
            {/* Step Content */}
            {currentStep === 0 && (
              <>
                <h2 className="text-[20px] font-semibold text-bonggy-text-primary mb-1">
                  Tell us about your company
                </h2>
                <p className="text-[14px] text-bonggy-text-secondary mb-6">
                  This helps us tailor your experience
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      How big is your company?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setCompanySize(size)}
                          className={`px-4 py-2.5 rounded-lg border text-[13px] transition-colors ${
                            companySize === size
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          {size} employees
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      Industry
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-bg text-[14px] text-bonggy-text-primary outline-none focus:border-bonggy-text-primary transition-colors"
                    >
                      <option value="">Select industry</option>
                      <option>B2B SaaS</option>
                      <option>Developer Tools</option>
                      <option>Fintech</option>
                      <option>Healthcare</option>
                      <option>E-commerce</option>
                      <option>Enterprise Software</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <h2 className="text-[20px] font-semibold text-bonggy-text-primary mb-1">
                  About your team
                </h2>
                <p className="text-[14px] text-bonggy-text-secondary mb-6">
                  Help us understand your sales motion
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      Sales team size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["1-5", "6-15", "16-50", "51-100", "100+"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTeamSize(size)}
                          className={`px-3 py-2.5 rounded-lg border text-[13px] transition-colors ${
                            teamSize === size
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      Your role
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "VP Sales",
                        "Sales Manager",
                        "SDR/BDR",
                        "RevOps",
                        "Founder",
                        "Other",
                      ].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRole(r)}
                          className={`px-3 py-2.5 rounded-lg border text-[13px] transition-colors ${
                            role === r
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-[20px] font-semibold text-bonggy-text-primary mb-1">
                  Define your ICP
                </h2>
                <p className="text-[14px] text-bonggy-text-secondary mb-6">
                  Who are your best-fit accounts?
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      Target company size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Startup", "Mid-market", "Enterprise"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setIcpSize(size)}
                          className={`px-3 py-2.5 rounded-lg border text-[13px] transition-colors ${
                            icpSize === size
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-bonggy-text-secondary mb-2 block">
                      Target funding stage
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Seed", "Series A-C", "Series D+"].map((stage) => (
                        <button
                          key={stage}
                          onClick={() => setFundingStage(stage)}
                          className={`px-3 py-2.5 rounded-lg border text-[13px] transition-colors ${
                            fundingStage === stage
                              ? "border-bonggy-accent text-bonggy-accent bg-bonggy-accent/10"
                              : "border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                          }`}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-bonggy-bg rounded-lg border border-bonggy-border p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-bonggy-accent" />
                      <span className="text-[12px] font-medium text-bonggy-text-primary">AI Suggestion</span>
                    </div>
                    <p className="text-[12px] text-bonggy-text-secondary leading-[1.5]">
                      Based on your profile, we recommend targeting Series A-C B2B SaaS companies with 50-500 employees who are hiring sales roles but haven't invested in RevOps yet.
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-[20px] font-semibold text-bonggy-text-primary mb-1">
                  Connect your stack
                </h2>
                <p className="text-[14px] text-bonggy-text-secondary mb-6">
                  Integrate with your existing tools
                </p>

                <div className="space-y-3">
                  {[
                    { name: "Salesforce", desc: "CRM sync & field mapping", connected: false },
                    { name: "HubSpot", desc: "CRM sync & field mapping", connected: false },
                    { name: "Apollo", desc: "Contact data & sequences", connected: true },
                    { name: "Outreach", desc: "Sequence execution", connected: false },
                    { name: "Slack", desc: "Alerts & notifications", connected: false },
                  ].map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between p-4 bg-bonggy-bg rounded-lg border border-bonggy-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-bonggy-surface border border-bonggy-border flex items-center justify-center">
                          <Radio size={16} className="text-bonggy-text-secondary" />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-bonggy-text-primary">{integration.name}</p>
                          <p className="text-[11px] text-bonggy-text-tertiary">{integration.desc}</p>
                        </div>
                      </div>
                      <button
                        className={`text-[12px] px-3 py-1.5 rounded-lg transition-colors ${
                          integration.connected
                            ? "text-bonggy-success bg-bonggy-success/10"
                            : "border border-bonggy-border text-bonggy-text-secondary hover:border-bonggy-border-hover"
                        }`}
                      >
                        {integration.connected ? "Connected" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-bonggy-border">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] transition-colors ${
                  currentStep === 0
                    ? "text-bonggy-text-tertiary cursor-not-allowed"
                    : "text-bonggy-text-secondary hover:bg-bonggy-bg"
                }`}
              >
                <ArrowLeft size={14} /> Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-[13px] transition-colors ${
                    canProceed
                      ? "bg-bonggy-text-primary text-bonggy-surface hover:opacity-85"
                      : "bg-bonggy-border text-bonggy-text-tertiary cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <Link
                  href="/app"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-bonggy-accent text-white text-[13px] hover:opacity-85 transition-opacity"
                >
                  Go to Dashboard <Zap size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
