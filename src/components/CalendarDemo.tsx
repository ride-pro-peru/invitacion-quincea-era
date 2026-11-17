import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"

interface CalendarDemoProps {
  initialDate?: Date
  className?: string
  captionLayout?: "dropdown" | "label" | "dropdown-months" | "dropdown-years"
}

export function CalendarDemo({ initialDate, className, captionLayout = "dropdown" }: CalendarDemoProps = {}) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate ?? new Date(2026, 11, 12))

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={date ?? new Date(2026, 11, 12)}
      locale={es}
      className={className ?? "rounded-2xl border bg-card p-4 shadow-sm mx-auto"}
      captionLayout={captionLayout}
    />
  )
}
