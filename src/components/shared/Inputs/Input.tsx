import * as React from "react"
import { cn } from "../../../lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  Icon?: React.ElementType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Icon />
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-3xl border border-input bg-gray-100 px-3 py-1 pl-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
