import { useState } from "react";
import { planningActions } from "@/services/api";
import { Plan, GoalPlan } from "@/types/planning";
import { Button } from "@/components/ui/Button";
import { FeasibilityBadge } from "./FeasibilityBadge";
import { ActionPlanList } from "./ActionPlanList";
import { Loader2, Calculator, CheckCircle } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

interface Props {
  goalId: string;
}

export function PlanningWidget({ goalId }: Props) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [goalPlan, setGoalPlan] = useState<GoalPlan | null>(null); // Saved plan
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSimulate() {
    setLoading(true);
    try {
      const result = await planningActions.calculateGoalPlan(goalId);
      setPlan(result);
    } catch (error) {
      toast.error("Erro ao simular plano.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!plan) return;
    setSaving(true);
    try {
      const result = await planningActions.saveGoalPlan(goalId, plan);
      setGoalPlan(result);
      toast.success("Plano salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar plano.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`${styles.glassCard} p-6 space-y-6 relative overflow-hidden`}>
       {/* Background decoration */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-[#32d6a5]/5 rounded-full blur-3xl z-0" />

       <div className="relative z-10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="text-[#32d6a5]" /> Planejamento Inteligente
            </h3>
            {plan && <FeasibilityBadge isViable={plan.isViable} />}
       </div>

       {!plan && !goalPlan && (
          <div className="relative z-10 text-center py-6">
              <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  Nossa I.A. analisa seu histórico de gastos e calcula se esta meta é viável no prazo estipulado.
               </p>
               <Button 
                onClick={handleSimulate} 
                disabled={loading} 
                className="bg-[#32d6a5] text-[#020809] hover:bg-[#2bc293] font-bold"
               >
                   {loading ? <Loader2 className="animate-spin mr-2" /> : <Calculator className="mr-2" size={18} />}
                   Simular Viabilidade
               </Button>
          </div>
       )}

       {plan && !goalPlan && (
           <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <p className="text-sm text-gray-300">
                       Depósito Mensal Necessário:
                       <strong className="text-white ml-2 text-lg">
                           {formatCurrency(plan.monthlyDeposit)}
                       </strong>
                   </p>
                   {plan.isViable ? (
                       <p className="text-green-400 text-sm mt-2 flex items-center gap-2 font-medium">
                           <CheckCircle size={16} /> Seu fluxo de caixa atual comporta esse valor!
                       </p>
                   ) : (
                       <p className="text-red-400 text-sm mt-2 font-medium">
                           Seu fluxo atual não é suficiente. Analisamos onde você pode ajustar.
                       </p>
                   )}
               </div>

               <ActionPlanList actions={plan.actionPlan} />

               <div className="flex gap-3 pt-2">
                   <Button 
                    onClick={handleSave} 
                    disabled={saving} 
                    className="flex-1 bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold"
                   >
                       {saving ? <Loader2 className="animate-spin" /> : "Aceitar Plano"}
                   </Button>
                   <Button variant="outline" onClick={() => setPlan(null)} className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                       Cancelar
                   </Button>
               </div>
           </div>
       )}
       
       {goalPlan && (
           <div className="relative z-10 text-center py-6">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                  <CheckCircle className="text-green-500" size={32} />
               </div>
               <h4 className="text-white font-bold text-lg">Plano Ativo</h4>
               <p className="text-gray-400 text-sm mt-2">Você está seguindo o planejamento sugerido pela I.A.</p>
               <Button variant="link" className="text-[#32d6a5] mt-2" onClick={() => setGoalPlan(null)}>Ver detalhes</Button>
           </div>
       )}
    </div>
  );
}
