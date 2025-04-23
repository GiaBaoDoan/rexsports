"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/store/store";
import { getReport } from "@/store/thunk/get-report";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const formattedFrom = date?.from ? format(date.from, "dd/MM/yyyy") : "";
  const formattedTo = date?.to ? format(date.to, "dd/MM/yyyy") : "";

  const dispatch = useAppDispatch();

  const handleSelectDate = (date: DateRange | undefined) => {
    if (!date?.from || !date?.to) return;

    const params = `?from=${date.from.toISOString()}&to=${date.to.toISOString()}`;
    dispatch(getReport(params));

    setDate(date);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formattedFrom} - {formattedTo}
                </>
              ) : (
                formattedFrom
              )
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
