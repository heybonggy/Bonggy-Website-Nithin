import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { Plus } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/* FAQ accordion (DESIGN.md §7.17): hairline dividers, a plus icon that turns
   45° when open, and a panel that animates its height. */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col divide-y divide-border border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn(className)} {...props} />
}

function AccordionTrigger({
  className,
  children,
  headingLevel = 3,
  ...props
}: AccordionPrimitive.Trigger.Props & { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3"
  return (
    <AccordionPrimitive.Header render={<Heading className="m-0" />}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex w-full items-start justify-between gap-6 py-5 text-left text-body font-medium text-foreground outline-none focus-visible:outline-2 focus-visible:outline-ring",
          className
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="mt-0.5 size-5 shrink-0 text-fg-2 transition-transform duration-[var(--dur-quick)] group-aria-expanded/accordion-trigger:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height,opacity] duration-[var(--dur-base)] ease-out-expo data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
      {...props}
    >
      <div className={cn("max-w-copy pb-6 pr-11 text-body text-fg-2", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
