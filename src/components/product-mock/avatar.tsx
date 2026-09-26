import { cn } from "@/lib/utils";
import { TONES, type AvatarSpec } from "./data";

const SHAPE_CLASS: Record<AvatarSpec["shape"], string> = {
  circle: "rounded-full",
  square: "rounded-[5px]",
  squircle: "rounded-[35%]",
  pill: "rounded-full scale-x-[0.82]",
  diamond: "rounded-[5px] rotate-45 scale-[0.78]",
};

/** An agent's avatar: a soft shape in a muted tone. Decorative. */
export function AgentAvatar({
  avatar,
  size = 28,
  className,
}: {
  avatar: AvatarSpec;
  size?: number;
  className?: string;
}) {
  const tone = TONES[avatar.tone];
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <span
        className={cn("absolute inset-0", SHAPE_CLASS[avatar.shape])}
        style={{
          background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${tone} 85%, white), ${tone} 55%, color-mix(in oklab, ${tone} 60%, black))`,
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 60%, white 10%)`,
        }}
      />
    </span>
  );
}

/** Stacked avatars for a group, with a "+n" count for the rest. */
export function AvatarStack({
  members,
  more,
  size = 20,
}: {
  members: AvatarSpec[];
  more: number;
  size?: number;
}) {
  return (
    <span aria-hidden className="flex items-center">
      {members.map((m, i) => (
        <span
          key={i}
          className="rounded-full ring-2 ring-card"
          style={{ marginLeft: i === 0 ? 0 : -size / 3 }}
        >
          <AgentAvatar avatar={m} size={size} />
        </span>
      ))}
      {more > 0 ? (
        <span
          className="ml-1 font-mono text-[10px] tabular-nums text-muted-foreground"
          style={{ lineHeight: `${size}px` }}
        >
          +{more}
        </span>
      ) : null}
    </span>
  );
}
