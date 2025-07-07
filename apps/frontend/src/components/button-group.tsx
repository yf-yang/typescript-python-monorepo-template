import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@udecode/cn"

const buttonGroupVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-background border border-input",
        outline: "border border-input bg-transparent",
        secondary: "bg-secondary",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const buttonGroupItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 first:rounded-l-md last:rounded-r-md border-r border-input last:border-r-0",
  {
    variants: {
      variant: {
        default: "text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        outline: "text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
        secondary: "text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonGroupContextType {
  value?: string
  onValueChange?: (value: string) => void
  variant?: VariantProps<typeof buttonGroupVariants>["variant"]
  size?: VariantProps<typeof buttonGroupVariants>["size"]
}

const ButtonGroupContext = React.createContext<ButtonGroupContextType | null>(null)

function ButtonGroup({
  className,
  variant,
  size,
  value,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants> & {
    value?: string
    onValueChange?: (value: string) => void
  }) {
  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange,
      variant,
      size,
    }),
    [value, onValueChange, variant, size]
  )

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        className={cn(buttonGroupVariants({ variant, size, className }))}
        role="group"
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
}

function ButtonGroupItem({
  className,
  value,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  value: string
}) {
  const context = React.useContext(ButtonGroupContext)
  
  if (!context) {
    throw new Error("ButtonGroupItem must be used within a ButtonGroup")
  }

  const { value: selectedValue, onValueChange, variant, size } = context
  const isActive = selectedValue === value

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onValueChange?.(value)
    onClick?.(event)
  }

  return (
    <button
      className={cn(buttonGroupItemVariants({ variant, size, className }))}
      data-state={isActive ? "active" : "inactive"}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export { ButtonGroup, ButtonGroupItem, buttonGroupVariants, buttonGroupItemVariants }