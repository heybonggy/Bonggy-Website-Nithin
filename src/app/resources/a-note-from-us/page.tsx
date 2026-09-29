import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { graphFor } from "@/lib/jsonld";
import { SubPageShell } from "@/components/marketing/sub-page-shell";
import { NewsHere } from "@/components/news-banner";
import { NOTE_PARAGRAPHS, NOTE_SUBTITLE } from "@/content/pages/note";


export const metadata: Metadata = pageMetadata({ slug: "note" });


export default function ANoteFromUsPage() {
  return (
    <>
      <JsonLd graph={graphFor("note")} />

    <SubPageShell eyebrow="Resources · Note" title="A note from us" lede={NOTE_SUBTITLE} narrow>
      <NewsHere />
      <article className="mx-auto w-full max-w-prose">
        <div className="space-y-5 text-body-lg text-fg-2">
          {NOTE_PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <p className="mt-12 text-body-lg italic text-fg-2 sm:mt-14">The Bonggy team</p>
      </article>
    </SubPageShell>
    </>
  );
}
