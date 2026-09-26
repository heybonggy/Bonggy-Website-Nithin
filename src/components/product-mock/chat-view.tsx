"use client";

import { Composer } from "./composer";

/**
 * A chat: the thread anchored to the bottom (newest message just above the
 * composer; older ones scroll away above), then the composer.
 */
export function ChatView({
  children,
  placeholder,
  composerValue,
  composerId,
}: {
  children: React.ReactNode;
  placeholder: string;
  /** Controlled composer text, e.g. a message being typed in a preview. */
  composerValue?: string;
  composerId?: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden">
        <div className="mx-auto grid w-full max-w-[760px] grid-cols-1 gap-5 px-4 pb-4 pt-6 sm:px-6">{children}</div>
      </div>
      <div className="mx-auto w-full max-w-[760px] px-3 pb-3 sm:px-6 sm:pb-4">
        <Composer
          placeholder={placeholder}
          value={composerValue}
          onChange={composerValue === undefined ? undefined : () => {}}
          id={composerId}
        />
      </div>
    </div>
  );
}
