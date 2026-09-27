import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors duration-[var(--dur-instant)] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:shadow-[inset_0_0_0_1px_var(--danger)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-surface-inverse text-fg-inverse hover:bg-surface-inverse/88",
        secondary: "bg-surface-2 text-foreground hover:bg-surface-3",
        outline: "hairline-strong bg-transparent text-foreground hover:bg-wash-hover aria-expanded:bg-wash-hover",
        ghost: "text-fg-2 hover:bg-wash-hover hover:text-foreground aria-expanded:bg-wash-hover",
        destructive: "bg-danger text-white hover:bg-danger/90",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-ui",
        xs: "h-7 px-2.5 text-caption",
        sm: "h-8 px-3.5 text-ui-sm",
        lg: "h-11 px-6 text-body",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
