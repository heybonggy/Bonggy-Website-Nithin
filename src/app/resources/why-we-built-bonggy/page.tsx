import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/sub-page-shell";

export const metadata: Metadata = {
  title: "Why we built Bonggy",
  description:
    "Three salespeople from Bengaluru on what is broken about sales today, what software can do about the reading part, and what should stay human.",
};

export default function WhyWeBuiltBonggyPage() {
  return (
    <SubPageShell
      eyebrow="Resources · Essay"
      title="Why we built"
      titleAccent="Bonggy."
      lede="Three salespeople from Bengaluru on what is broken about sales today — and what software can and cannot do about it."
      narrow
    >
      <article className="mx-auto w-full max-w-[680px]">
        <p className="text-[16px] italic leading-[1.75] text-muted-foreground sm:text-[17px]">
          By the Bonggy team
        </p>

        <section className="mt-10 space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>We are three salespeople in Bengaluru.</p>
          <p>
            Before we started this company, we did the job for a living. We carried bags. We hit numbers. We missed
            numbers. We worked at companies where the playbook was good and at companies where the playbook was a
            Notion page nobody had updated since the seed round. We did the cold calls and the cold emails and the
            conference dinners and the airport waits. We did all of it.
          </p>
          <p>
            So when we say we know what is broken about sales today, it is not because we read a Substack about it. We
            lived it.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            There is a small story behind this company that does not really matter to anyone except us, but it
            explains why we are doing it together.
          </p>
          <p>
            We met on a sales floor a few years ago. Three of us, sitting near each other on a row of desks, headsets
            on, dialing through lists. None of us came to the job the same way. One of us was an engineer who could
            not stand sitting alone in front of a computer all day. One of us had been in a sales role since school,
            but at a kind of business that had nothing to do with software. One of us had drifted in from a different
            industry entirely, the kind of move that is more common in this city than people outside it realize.
          </p>
          <p>
            What we had in common was that we were all good at the job in different ways. We were all bad at the parts
            of the job we hated, and we hated them for the same reasons. And we were all convinced, completely
            convinced, that the way the job was being done was not the way it should be done.
          </p>
          <p>
            We stayed friends after that floor scattered. People moved companies. One of us moved to one of the big
            Indian SaaS companies. Another joined a US team that was building out their Bengaluru office. The third
            went to a startup that ran out of money eighteen months later. We kept meeting. Coffee in Indiranagar.
            Beers in Koramangala. Every time we met, the same conversation came back. The same complaint about the
            tools. The same observation that the rep who was actually winning was not the rep with the fanciest stack.
            The same line, said by one of us or another, that somebody really should build the thing none of us had
            time to build.
          </p>
          <p>
            You can only have a conversation that many times before you have to either stop having it or do something
            about it.
          </p>
          <p>We did the second one.</p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>Sales has always been about two things. Noticing first, and saying the right thing.</p>
          <p>
            The trainers we grew up reading, Jeb Blount, Anthony Iannarino, Trish Bertuzzi, Aaron Ross, Sam McKenna,
            Josh Braun, all of them, in their different voices, have been saying versions of the same thing for thirty
            years. Pay attention to your buyer&apos;s world. Speak to that world in a way that proves you have paid
            attention. That is what good selling is. It always has been.
          </p>
          <p>The thing nobody told us when we started selling was how much work that actually takes.</p>
          <p>
            To notice first, you have to read the news, the feed, the comments on the feed, the podcast someone you
            care about appeared on, the G2 reviews of the tool your prospect is unhappy with, the job listings that
            signal where a team is bleeding, the Reddit threads where their customers complain. Every day. For every
            account in your book. Forever.
          </p>
          <p>
            And then, to say the right thing, you have to take all of that and somehow distill it into a sentence that
            earns a reply from someone who has thirty unread cold emails in their inbox and zero time for any of them.
          </p>
          <p>
            This is the actual work. The conferences and the meetings and the demos are downstream of this work. The
            pipeline is downstream of this work. The quota is downstream of this work.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>
            Most reps do not do this work. Not because they are lazy. Because it is impossible to do at the scale they
            are expected to operate.
          </p>
          <p>
            A rep with two hundred accounts in their book physically cannot read everything that matters about all of
            them. So they do the math the only way it can be done. They send template emails. They blast the
            platforms. They hope volume substitutes for relevance. And it does, a little, for a while. Until it does
            not.
          </p>
          <p>
            When you sit across from a great rep, what you notice is they are not faster than other reps. They are
            more present. They have read your last post. They mention the partnership you announced last week. They
            reference something you said on a podcast six months ago that you forgot you said. That is what you
            remember. That is why you bought.
          </p>
          <p>
            The trainers know this. They have been saying it for thirty years. Sam McKenna&apos;s whole framework
            comes down to four words: show me you know me. That is the job. It has always been the job. The reps who
            do it well still win. The reps who try to fake it through volume still lose, just slower than they used
            to.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>The second problem is what the sales internet has become.</p>
          <p>
            The social platforms that should have been the best places for salespeople to learn how to be more present
            have become the worst. Open any of them on a given morning. You will see ten posts that all start with
            &quot;Most SDRs are doing this wrong&quot; followed by a list of seven things. You will see people who
            built a workflow and want you to know about it. You will see referral schemes dressed up as advice. You
            will see the comment-this-for-the-playbook ponzi, the comment-this-to-clone-my-agent ponzi, the
            engagement-pod ponzi. You will see borrowed thinking, recycled hot takes, performative outrage, and almost
            no actual reps talking about actual work.
          </p>
          <p>
            The reps who try to build a brand on these platforms usually fail because they try to imitate what is
            winning on them. And what is winning is noise. They post the listicles, they share the tools they did not
            build, they parrot the takes, and nothing happens. Because nothing they posted came from their own mind.
          </p>
          <p>
            Meanwhile the prospects they are trying to reach are getting fifty messages a day from people who used the
            same template that someone online told them was working. The prospects can smell it. The reply rates drop.
            The reps blame the channel. They move to the next channel. They blast that one too.
          </p>
          <p>
            This is not a channel problem. It is a thinking problem. The channel works fine when someone has something
            real to say.
          </p>
          <p>This is the sales world we entered. This is the sales world we left to start Bonggy.</p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>We have one core conviction.</p>
          <p>
            The job of being present, of noticing first, of saying the right thing, has not changed. What has changed
            is that there is now a layer of software capable of doing the reading part. Not the relationship part. Not
            the judgment part. Not the saying part. The reading part. The continuous, twenty-four-hour, never-tired
            reading of every signal in every place a buyer leaves a trace.
          </p>
          <p>
            That is what we are building. A layer that sits between the world and the rep, reads everything that
            matters, and surfaces what is worth acting on. So that when the rep sits down to write, they have already
            read the post, the podcast quote, the G2 review, the funding announcement, the hire, the org change, the
            price cut at the competitor, the conference attendance. So that the work that used to take three hours
            has been done before they opened their laptop. So that the actual work of writing the right sentence to
            the right person at the right moment is the only work left.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>What we are not building.</p>
          <p>
            We are not building another database of every person in the world. The world has Apollo, ZoomInfo,
            Cognism, Lusha, half a dozen more. Those tools work. We have used them. We do not need a slightly better
            one.
          </p>
          <p>
            We are not building another sequence tool. Outreach, Salesloft, Apollo, Instantly, Smartlead, Lemlist all
            exist. They do the sending. We do not need to do the sending.
          </p>
          <p>
            We are not building an autopilot. There is a category of products being marketed right now that promise to
            fully automate outbound, send unsupervised messages, book meetings while you sleep. We think these
            products are a disaster waiting to happen for the buyer of the product and a disaster already happening
            for the people on the receiving end of the messages. The reason cold outbound still works at all is that
            great reps are doing it thoughtfully. The minute the messages stop being thoughtful, the channel dies. We
            do not want to be part of killing the channel.
          </p>
          <p>
            We are not building something that pretends to replace the rep. We are building something that handles the
            part of the job no human can keep up with anymore, so that the human can do the part that requires being
            human.
          </p>
          <p>
            Anthony Iannarino has a line in The Lost Art of Closing about how the sales call is the work. The
            conversation is the work. Everything else is preparation. We believe that. We are building the best
            preparation engine ever built. We are not building a replacement for the conversation.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>Who this is for.</p>
          <p>
            It is for the rep who actually wants to be good at this job. The one who reads, who notices, who has been
            frustrated for years by how much of their time goes to research and how little goes to the actual
            conversation. The one who knows their reply rates are going down not because they got worse but because
            their inbox got more crowded. The one who has tried six tools and is tired of being sold to. The one who
            suspects, correctly, that the right tool would feel like having a really good chief of staff who reads
            the news for them.
          </p>
          <p>
            It is also for the team that has hired this rep. The leader who is watching their best person spend
            Mondays on research and Tuesdays on writing and Wednesdays on sending, and who knows there is a better
            split. The leader who would rather have their rep make ten meaningful touches than a hundred forgettable
            ones. The leader who understands, deep down, that the era of blast-everyone outbound is ending and is
            looking for what comes next.
          </p>
        </section>

        <div aria-hidden className="my-12 border-t border-border/40 sm:my-14" />

        <section className="space-y-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">
          <p>The promise.</p>
          <p>
            We will not waste your time. We will not pretend to do work we cannot do. We will not send anything you
            did not approve. We will not pollute the channels you depend on. We will read the world for you and we
            will let you decide what to say.
          </p>
          <p>
            That is the company. That is what we are building. We hope it is useful. If it is, we would love to hear
            about it. If it is not, we would love to hear about that too.
          </p>
        </section>

        <p className="mt-10 text-[16px] italic leading-[1.75] text-muted-foreground sm:text-[17px]">
          - The Bonggy team
        </p>
      </article>
    </SubPageShell>
  );
}
