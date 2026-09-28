export const CONTACT_EMAIL = "founders@bonggy.com";

/** The contact address as a mailto link, for use inside running text. */
export function EmailLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-4 hover:no-underline">
      {CONTACT_EMAIL}
    </a>
  );
}
