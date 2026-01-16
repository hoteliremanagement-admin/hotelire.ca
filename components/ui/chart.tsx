"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"

// -------------------- THEMES --------------------
const THEMES = { light: "", dark: ".dark" } as const

// -------------------- TYPES --------------------
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

// -------------------- CONTEXT --------------------
const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

// -------------------- CONTAINER --------------------
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

// -------------------- STYLE --------------------
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.color || c.theme
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, item]) => {
    const color =
      item.theme?.[theme as keyof typeof item.theme] || item.color
    return color ? `  --color-${key}: ${color};` : ""
  })
  .join("\n")}
}`
          )
          .join("\n"),
      }}
    />
  )
}

// -------------------- TOOLTIP --------------------
const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean
    payload?: any[]
    label?: any
    className?: string
    hideLabel?: boolean
    formatter?: (...args: any[]) => React.ReactNode
    labelFormatter?: (...args: any[]) => React.ReactNode
  }
>(function ChartTooltipContent(
  {
    active,
    payload,
    label,
    className,
    hideLabel = false,
    formatter,
    labelFormatter,
  },
  ref
) {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}

      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = item?.dataKey || item?.name || "value"
          const itemConfig = config[key]

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-muted-foreground">
                {itemConfig?.label || item?.name}
              </span>
              <span className="font-mono font-medium">
                {formatter
                  ? formatter(item.value)
                  : item.value?.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

// -------------------- LEGEND --------------------
const ChartLegend = Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  {
    payload?: any[]
    className?: string
  }
>(function ChartLegendContent({ payload, className }, ref) {
  const { config } = useChart()

  if (!payload || payload.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
    >
      {payload.map((item, index) => {
        const key = item?.dataKey || "value"
        const itemConfig = config[key]

        return (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded"
              style={{ backgroundColor: item.color }}
            />
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

// -------------------- EXPORTS --------------------
export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}
