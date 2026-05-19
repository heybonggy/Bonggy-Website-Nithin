"use client";

import { useId } from "react";

type BonggyMarkProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function BonggyMark({ size = 40, className, title = "Bonggy" }: BonggyMarkProps) {
  const uid = useId().replace(/:/g, "");
  const idBase = `tmio-${uid}-base`;
  const idGloss = `tmio-${uid}-gloss`;
  const idShade = `tmio-${uid}-shade`;
  const idBounce = `tmio-${uid}-bounce`;
  const idMask = `tm-${uid}-mask`;
  const idClip = `tm-${uid}-clip`;
  const idGlow = `tm-${uid}-glow`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <mask id={idMask}>
          <rect width="200" height="200" fill="white" />
          <g transform="rotate(-45 100 100)">
            <path
              d="M 6 100 A 94 24 0 0 1 194 100"
              fill="none"
              stroke="black"
              strokeWidth="12"
            />
          </g>
        </mask>
        <clipPath id={idClip}>
          <circle cx="100" cy="100" r="64" />
        </clipPath>
        <filter id={idGlow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <radialGradient id={idBase} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#9BE8C4" />
          <stop offset="38%" stopColor="#3DA172" />
          <stop offset="78%" stopColor="#1B6E4A" />
          <stop offset="100%" stopColor="#0D3A27" />
        </radialGradient>
        <radialGradient id={idGloss} cx="50%" cy="0%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#D1FAE5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idShade} cx="50%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#020A07" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#020A07" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={idBounce} cx="50%" cy="95%" r="40%">
          <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform="rotate(-45 100 100)">
        <path
          d="M 6 100 A 94 24 0 0 0 194 100"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="4"
          opacity="0.35"
          strokeLinecap="round"
          filter={`url(#${idGlow})`}
        />
        <path
          d="M 6 100 A 94 24 0 0 1 194 100"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="4"
          opacity="0.45"
          strokeLinecap="round"
          filter={`url(#${idGlow})`}
        />
        <path
          d="M 6 100 A 94 24 0 0 0 194 100"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="1.1"
          opacity="0.8"
          strokeLinecap="round"
        />
        <path
          d="M 6 100 A 94 24 0 0 1 194 100"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="1.6"
          opacity="1"
          strokeLinecap="round"
        />
      </g>

      <g mask={`url(#${idMask})`}>
        <g clipPath={`url(#${idClip})`}>
          <circle cx="100" cy="100" r="64" fill={`url(#${idBase})`} />
          <circle cx="100" cy="100" r="64" fill={`url(#${idShade})`} />
          <circle cx="100" cy="100" r="64" fill={`url(#${idBounce})`} />
          <ellipse cx="100" cy="78" rx="44" ry="24" fill={`url(#${idGloss})`} />
          <circle
            cx="100"
            cy="100"
            r="64"
            fill="none"
            stroke="#A7F3D0"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <path
            d="M 60 72 A 50 50 0 0 1 116 52"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.4"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 62 70 A 48 48 0 0 1 112 54"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

export default BonggyMark;
