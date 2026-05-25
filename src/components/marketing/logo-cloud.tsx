import * as React from "react";

/**
 * Logo marquee. Real SVG marks (Apollo, Salesforce, LinkedIn) from 21st.dev,
 * paired with wordmark text. Clay / Instantly / HubSpot / Mailchimp use
 * hand-crafted minimal marks + text in the same visual register, so the row
 * reads as one cohesive treatment instead of mismatched brand assets.
 */

function LockupRow({
  mark,
  name,
}: {
  mark?: React.ReactNode;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-foreground/70 transition-colors hover:text-foreground">
      {mark}
      <span className="text-[18px] font-semibold tracking-[-0.04em]">
        {name}
      </span>
    </div>
  );
}

function ApolloMark() {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M91.044 36.135H78.489l6.51 11.134 6.045-11.134ZM108.494 98.987 63.922 25 19.5 98.832h23.792c3.174 0 6.297-.8 9.058-2.316 2.98-1.638 5.23-4.012 6.989-6.89 2.056-3.367 4.053-6.773 6.077-10.16l5.178-8.67-6.678-11.167-2.961 4.755c-3.375 5.631-6.569 11.392-10.066 16.947-1.759 2.786-4.054 5.418-7.442 6.096a9.686 9.686 0 0 1-1.558.174c-.698.026-1.397.013-2.088.013l24.121-40.99 30.975 52.363h13.597Z"
      />
    </svg>
  );
}

function SalesforceMark() {
  return (
    <svg
      viewBox=".5 .5 999 699"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M416.224 76.763c32.219-33.57 77.074-54.391 126.682-54.391 65.946 0 123.48 36.772 154.12 91.361 26.626-11.896 56.098-18.514 87.106-18.514 118.94 0 215.368 97.268 215.368 217.247 0 119.993-96.428 217.261-215.368 217.261a213.735 213.735 0 0 1-42.422-4.227c-26.981 48.128-78.397 80.646-137.412 80.646-24.705 0-48.072-5.706-68.877-15.853-27.352 64.337-91.077 109.448-165.348 109.448-77.344 0-143.261-48.939-168.563-117.574-11.057 2.348-22.513 3.572-34.268 3.572C75.155 585.74.5 510.317.5 417.262c0-62.359 33.542-116.807 83.378-145.937-10.26-23.608-15.967-49.665-15.967-77.06C67.911 87.25 154.79.5 261.948.5c62.914 0 118.827 29.913 154.276 76.263"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      />
    </svg>
  );
}

function ClayMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        opacity="0.95"
        d="M12 2 L21 7 L12 12 L3 7 Z"
      />
      <path
        fill="currentColor"
        opacity="0.55"
        d="M3 12 L12 17 L21 12 L12 22 L3 12 Z"
      />
    </svg>
  );
}

function InstantlyMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M13 2 L4 14 L10 14 L8 22 L20 8 L13 8 Z"
      />
    </svg>
  );
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <circle cx="18" cy="6" r="2.4" fill="currentColor" />
      <circle cx="18" cy="18" r="2.4" fill="currentColor" />
      <circle cx="6" cy="12" r="2.4" fill="currentColor" />
      <line
        x1="6"
        y1="12"
        x2="18"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="6"
        y1="12"
        x2="18"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MailchimpMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3 C7 3 4 7 4 12 c0 4 3 7 7 7 c2 0 4 -1 5 -3 c-2 1 -5 0 -6 -2 c2 1 5 0 6 -3 c-2 1 -4 -1 -4 -3 c0 -2 2 -4 4 -4 c1 0 2 1 2 1 c-1 -2 -3 -2 -4 -2 z"
      />
      <circle cx="15.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
  );
}

const BRANDS: { mark: React.ReactNode; name: string }[] = [
  { mark: <ApolloMark />, name: "Apollo" },
  { mark: <ClayMark />, name: "Clay" },
  { mark: <InstantlyMark />, name: "Instantly" },
  { mark: <HubSpotMark />, name: "HubSpot" },
  { mark: <SalesforceMark />, name: "Salesforce" },
  { mark: <MailchimpMark />, name: "Mailchimp" },
  { mark: <LinkedInMark />, name: "LinkedIn" },
];

export function LogoCloud() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section
      id="logo-cloud"
      className="relative border-y border-border/60 bg-card/20 py-14"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
          Replaces the wiring across the stack you already pay for
        </div>

        <div className="relative mt-9 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

          <div className="marquee flex w-max items-center gap-14">
            {doubled.map((b, i) => (
              <LockupRow key={i} mark={b.mark} name={b.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
