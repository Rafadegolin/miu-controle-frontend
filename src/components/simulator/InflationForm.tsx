import { useState } from "react";
import { InflationParams, InflationScenario } from "@/types/inflation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Loader2, Play } from "lucide-react";

interface Props {
  scenarios: InflationScenario[];
  onSimulate: (params: InflationParams) => void;
  isLoading: boolean;
}

export function InflationForm({ scenarios, onSimulate, isLoading }: Props) {
  const [inflationRate, setInflationRate] = useState<string>("4.5");
  const [salaryAdjustment, setSalaryAdjustment] = useState<string>("2.0");
  const [periodMonths, setPeriodMonths] = useState<string>("24");
  const [selectedScenario, setSelectedScenario] = useState<string>("custom");

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate({
      inflationRate: parseFloat(inflationRate),
      salaryAdjustment: parseFloat(salaryAdjustment),
      periodMonths: parseInt(periodMonths),
    });
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    if (scenarioId === "custom") return;

    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario && scenario.rate !== undefined && scenario.rate !== null) {
      setInflationRate(scenario.rate.toString());
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Cenário</Label>
        <Select value={selectedScenario} onValueChange={handleScenarioChange}>
          <SelectTrigger className="bg-[#1e293b] border-[#334155] text-white">
            <SelectValue placeholder="Escolha um cenário" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e293b] border-[#334155] text-white">
            <SelectGroup>
              <SelectLabel>Escolha um Cenário</SelectLabel>
              <SelectItem value="custom">Personalizado</SelectItem>
              {scenarios.map((s, index) => (
                <SelectItem key={`${s.id}-${index}`} value={s.id}>
                  {s.name} ({s.rate}% a.a.)
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Inflação Média (% a.a.)</Label>
          <Input 
            type="number" 
            step="0.1" 
            value={inflationRate} 
            onChange={(e) => {
              setInflationRate(e.target.value);
              setSelectedScenario("custom");
            }}
            className="bg-[#1e293b] border-[#334155] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label>Reajuste Salarial (% a.a.)</Label>
          <Input 
            type="number" 
            step="0.1" 
            value={salaryAdjustment} 
            onChange={(e) => setSalaryAdjustment(e.target.value)}
            className="bg-[#1e293b] border-[#334155] text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
         <Label>Período (Meses)</Label>
         <div className="flex bg-[#1e293b] border border-[#334155] rounded-md overflow-hidden">
             <Button
                variant="ghost"
                type="button"
                onClick={() => setPeriodMonths("12")}
                className={`flex-1 rounded-none hover:bg-white/5 ${periodMonths === "12" ? "bg-white/10 text-[#32d6a5]" : "text-gray-400"}`}
             >
                 1 Ano
             </Button>
             <div className="w-px bg-[#334155]" />
             <Button
                variant="ghost"
                 type="button"
                onClick={() => setPeriodMonths("24")}
                className={`flex-1 rounded-none hover:bg-white/5 ${periodMonths === "24" ? "bg-white/10 text-[#32d6a5]" : "text-gray-400"}`}
             >
                 2 Anos
             </Button>
             <div className="w-px bg-[#334155]" />
             <Button
                variant="ghost"
                 type="button"
                onClick={() => setPeriodMonths("60")}
                className={`flex-1 rounded-none hover:bg-white/5 ${periodMonths === "60" ? "bg-white/10 text-[#32d6a5]" : "text-gray-400"}`}
             >
                 5 Anos
             </Button>
             <div className="w-px bg-[#334155]" />
             <Input 
                type="number" 
                value={periodMonths}
                onChange={(e) => setPeriodMonths(e.target.value)}
                className="w-20 border-none focus-visible:ring-0 text-center bg-transparent text-white" 
             />
         </div>
      </div>

      <Button 
        onClick={handleSimulate} 
        disabled={isLoading} 
        className="w-full bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold py-6 text-lg"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Play className="mr-2 fill-current" />}
        Simular Impacto
      </Button>
    </div>
  );
}
