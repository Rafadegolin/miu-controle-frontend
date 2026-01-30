"use client";

import { useState, useEffect } from "react";
import { inflationActions } from "@/services/api";
import { InflationImpact, InflationParams, InflationScenario } from "@/types/inflation";
import { InflationForm } from "@/components/simulator/InflationForm";
import { ImpactSummary } from "@/components/simulator/ImpactSummary";
import { GoalsImpactList } from "@/components/simulator/GoalsImpactList";
import { Card } from "@/components/ui/Card";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { TrendingDown, Info } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function InflationSimulatorPage() {
  const [scenarios, setScenarios] = useState<InflationScenario[]>([]);
  const [impact, setImpact] = useState<InflationImpact | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScenarios();
  }, []);

  async function loadScenarios() {
    try {
      const data = await inflationActions.getScenarios();
      setScenarios(data.filter(s => typeof s.rate === 'number'));
    } catch (error) {
       console.error("Failed to load scenarios", error);
       // Fallback mock scenarios if backend is not ready
       setScenarios([
           { id: "optimistic", name: "Otimista", rate: 3.0, description: "Cenário de inflação controlada" },
           { id: "realistic", name: "Realista (IPCA)", rate: 4.5, description: "Projeção atual do mercado" },
           { id: "pessimistic", name: "Pessimista", rate: 8.0, description: "Cenário de crise econômica" },
       ]);
    }
  }

  async function handleSimulate(params: InflationParams) {
    setLoading(true);
    try {
      const result = await inflationActions.calculateImpact(params);
      setImpact(result);
    } catch (error) {
      toast.error("Erro ao calcular simulação.");
      console.error(error);
      // Mock result for demonstration if backend fails
      setImpact({
          realGain: ((1 + params.salaryAdjustment / 100) / (1 + params.inflationRate / 100) - 1) * 100,
          purchasingPowerProjected: 1000 * Math.pow(1 / (1 + params.inflationRate / 100), params.periodMonths / 12),
          goalsImpact: [],
          mensalBudgetIncrease: 150.00
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
           <TrendingDown size={24} />
        </div>
        <div>
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
               Simulador de Inflação
               <Popover>
                  <PopoverTrigger>
                      <Info size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1e293b] border-[#334155] text-gray-300 text-sm w-80">
                      Entenda como a inflação corrói seu dinheiro e como proteger seus investimentos e metas.
                  </PopoverContent>
               </Popover>
           </h2>
           <p className="text-xs text-gray-500">Projete seu poder de compra futuro.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
              <Card className={`${styles.glassCard} p-6 border-blue-500/10`}>
                  <InflationForm 
                     scenarios={scenarios} 
                     onSimulate={handleSimulate} 
                     isLoading={loading} 
                  />
              </Card>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-2 space-y-6">
              {!impact ? (
                  <div className={`${styles.glassCard} flex flex-col items-center justify-center min-h-[400px] text-center p-8 border-dashed border-2 border-white/5`}>
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                          <TrendingDown className="text-gray-500" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-300">Aguardando Simulação</h3>
                      <p className="text-gray-500 max-w-md mt-2">
                          Preencha os dados à esquerda para ver como a inflação afeta seu patrimônio e suas metas.
                      </p>
                  </div>
              ) : (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <ImpactSummary impact={impact} />
                      
                      <Card className={`${styles.glassCard} p-6`}>
                          <GoalsImpactList goals={impact.goalsImpact || []} />
                          {(!impact.goalsImpact || impact.goalsImpact.length === 0) && (
                              <p className="text-gray-500 text-center py-4 text-sm">
                                  Nenhuma meta ativa encontrada para projetar impacto.
                              </p>
                          )}
                      </Card>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}
