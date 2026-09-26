"use client";

import { CtaButton, type CtaButtonProps } from "./cta-button";
import { EarlyAccessModal } from "./early-access-modal";

/** "Get early access" button that opens the existing Early-access modal. */
export function EarlyAccessCta({
  children = "Get early access",
  ...props
}: Omit<CtaButtonProps, "asButton" | "href" | "onClick" | "type">) {
  return (
    <EarlyAccessModal
      trigger={
        <CtaButton asButton {...props}>
          {children}
        </CtaButton>
      }
    />
  );
}
