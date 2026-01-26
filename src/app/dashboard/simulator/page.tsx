"use client";

import { useState } from "react";
import { ScenarioType, SimulationResult, SimulationRequest } from "@/types/scenarios";
import { ScenarioSelector } from "@/components/simulator/ScenarioSelector";
import { SimulationForm } from "@/components/simulator/SimulationForm";
import { SimulationResultDisplay } from "@/components/simulator/SimulationResult";
import { simulateScenario } from "@/services/scenarios.actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/components/dashboard/styles/Dashboard.module.css";

export default function SimulatorPage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for dev/demo if backend fails or is not ready
  const mockSimulation = (req: SimulationRequest): SimulationResult => {
      const isBad = req.amount! > 10000;
      return {
          isViable: !isBad,
          lowestBalance: isBad ? -2500 : 1200,
          baselineProjection: [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500],
          projectedBalance12Months: Array.from({length: 12}, (_, i) => 5000 + (i * 500) - (req.amount!/ (req.installments || 1)) * (i < (req.installments || 1) ? (i+1) : (req.installments || 1))),
          recommendations: isBad 
            ? ["Considere aumentar o número de parcelas", "Corte gastos não essenciais", "Adie a compra para o próximo semestre"] 
            : ["Cenário seguro", "Você manterá uma reserva saudável"],
      }
  }

  const handleSimulate = async (data: SimulationRequest) => {
    setIsLoading(true);
    setResult(null);
    try {
      // Trying real API first, falling back to mock for demo stability if user hasn't set up backend yet
      try {
          const res = await simulateScenario(data);
          setResult(res);
      } catch (e) {
          console.warn("API failed, using mock for demonstration", e);
          // Fallback mock
          setTimeout(() => {
             setResult(mockSimulation(data));
          }, 1500);
      }
    } catch (error) {
      toast.error("Erro ao realizar simulação");
    } finally {
      // Only set loading false after the "mock" delay if using fallback, or immediately if real api worked
      if (!result) setTimeout(() => setIsLoading(false), 1500); 
      else setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Simulador "E Se?"</h1>
        <p className="text-gray-400">Projete o impacto de suas decisões financeiras antes de tomá-las.</p>
      </div>

      <ScenarioSelector selected={selectedScenario} onSelect={(t) => { setSelectedScenario(t); setResult(null); }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <AnimatePresence mode="popLayout">
            {selectedScenario && (
                <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="lg:col-span-4"
                >
                    <div className={`${styles.glassCard} p-6`}>
                        <h2 className="text-xl font-bold text-white mb-6">Configurar Cenário</h2>
                        <SimulationForm 
                            type={selectedScenario} 
                            onSubmit={handleSimulate} 
                            isLoading={isLoading} 
                        />
                    </div>
                </motion.div>
            )}

            {result && (
                <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-8"
                >
                     <SimulationResultDisplay result={result} />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      {!selectedScenario && (
          <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-lg">Selecione um tipo de cenário acima para começar</p>
          </div>
      )}
    </div>
  );
}
