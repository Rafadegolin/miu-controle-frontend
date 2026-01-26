import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface ReportsHeaderProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (range: { from: Date; to: Date }) => void;
}

export function ReportsHeader({ startDate, endDate, onDateChange }: ReportsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Relatórios Avançados</h1>
        <p className="text-gray-400 text-sm">
          Análise detalhada de suas finanças
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                <>
                  {format(startDate, "dd/MM/yyyy")} -{" "}
                  {format(endDate, "dd/MM/yyyy")}
                </>
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#0f172a] border-white/10" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={startDate}
              selected={{ from: startDate, to: endDate }}
              onSelect={(range: any) => {
                if (range?.from && range?.to) {
                  onDateChange(range);
                }
              }}
              numberOfMonths={2}
              className="bg-[#0f172a] text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
