import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-[#3f2c77]" />
    </SliderPrimitive.Track>

    {/* LEFT THUMB (Min) */}
    <SliderPrimitive.Thumb
      className="block h-5 w-5 rounded-full border-2 border-[#3f2c77] bg-white shadow
      focus:outline-none focus:ring-2 focus:ring-[#3f2c77]"
    />

    {/* RIGHT THUMB (Max) */}
    <SliderPrimitive.Thumb
      className="block h-5 w-5 rounded-full border-2 border-[#3f2c77] bg-white shadow
      focus:outline-none focus:ring-2 focus:ring-[#3f2c77]"
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName
export { Slider }
