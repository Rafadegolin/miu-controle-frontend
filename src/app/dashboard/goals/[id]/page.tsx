"use client";

import { useParams, useRouter } from "next/navigation";
import { useGoal, useContributeToGoal, useUploadGoalImage, useDeleteGoalImage, useAddPurchaseLink, useUpdatePurchaseLink, useDeletePurchaseLink } from "@/hooks/useGoals";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Loader2, Plus, Minus, TrendingUp, Upload, Camera } from "lucide-react";
import { ImageUpload } from "@/components/goals/ImageUpload";
import { PurchaseLinksManager } from "@/components/goals/PurchaseLinksManager";
import { GoalForecast } from "@/components/goals/GoalForecast";
import { PlanningWidget } from "@/components/goals/planning/PlanningWidget";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { goalsActions } from "@/services/goals.actions"; // Import for withdraw
import styles from "@/components/dashboard/styles/Dashboard.module.css";

export default function GoalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const { data: goal, isLoading, error } = useGoal(id);
  const { mutate: contribute, isPending: isContributing } = useContributeToGoal();
  
  // Image Hooks
  const { mutate: uploadImage, isPending: isUploading } = useUploadGoalImage();
  const { mutate: deleteImage, isPending: isDeletingImage } = useDeleteGoalImage();

  // Links Hooks
  const { mutateAsync: addLink } = useAddPurchaseLink();
  const { mutateAsync: updateLink } = useUpdatePurchaseLink();
  const { mutateAsync: deleteLink } = useDeletePurchaseLink();

  // Contribution State
  const [contributionModalOpen, setContributionModalOpen] = useState(false);
  const [contributionType, setContributionType] = useState<"DEPOSIT" | "WITHDRAW">("DEPOSIT");
  const [amount, setAmount] = useState("");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00404f]" />
      </div>
    );
  }

  if (error || !goal) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500">Erro ao carregar meta.</p>
        <Button onClick={() => router.back()} variant="outline">Voltar</Button>
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  const handleContribution = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      toast.error("Valor inválido");
      return;
    }

    if (contributionType === "DEPOSIT") {
      contribute(
        { id, data: { amount: val, date: new Date().toISOString() } },
        {
          onSuccess: () => {
            toast.success("Contribuição realizada!");
            setContributionModalOpen(false);
            setAmount("");
          },
        }
      );
    } else {
      goalsActions.withdrawFromGoal(id, val).then(() => {
          toast.success("Saque realizado!");
          setContributionModalOpen(false);
          setAmount("");
           window.location.reload(); 
      }).catch((e) => toast.error("Erro ao sacar."));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 max-w-7xl mx-auto">
      
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#131b20] flex items-center justify-center text-xl">
                 {goal.icon || "🎯"}
            </div>
            <div>
                 <h2 className="text-xl font-bold text-[#00404f] dark:text-[#32d6a5]">{goal.name}</h2>
                 <p className="text-xs text-gray-500">
                    Criada em {new Date(goal.createdAt).toLocaleDateString()}
                    {goal.targetDate && ` • Meta: ${new Date(goal.targetDate).toLocaleDateString()}`}
                 </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: MAIN STATS CARD */}
        <div className="lg:col-span-2 space-y-6">
            {/* HERRO CARD - Teal Background */}
            <div className={`${styles.glassCard} relative overflow-hidden group`}>
                 <div className="absolute inset-0 bg-linear-to-br from-[#00404f]/20 to-transparent pointer-events-none" />
                 
                 <div className="relative z-10 flex justify-between items-end mb-8">
                     <div>
                         <p className="text-gray-400 text-sm font-medium mb-1">Valor Atual</p>
                         <h3 className="text-4xl md:text-5xl font-bold text-[#32d6a5] tracking-tight">
                             {goal.currentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                         </h3>
                     </div>
                     <div className="text-right">
                         <p className="text-gray-400 text-sm font-medium mb-1">Meta</p>
                         <h3 className="text-xl font-bold text-white">
                             {goal.targetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                         </h3>
                     </div>
                 </div>

                 <div className="relative z-10 space-y-2 mb-8">
                     <div className="flex justify-between text-sm font-bold">
                         <span className="text-[#32d6a5]">{percentage}% Concluído</span>
                         <span className="text-gray-400">Faltam {remaining.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                     </div>
                     <div className="h-4 w-full bg-[#131b20] rounded-full overflow-hidden border border-white/5">
                         <div 
                             className="h-full bg-[#32d6a5] shadow-[0_0_20px_rgba(50,214,165,0.4)] transition-all duration-1000 ease-out relative"
                             style={{ width: `${percentage}%` }}
                         >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                         </div>
                     </div>
                 </div>

                 <div className="relative z-10 grid grid-cols-2 gap-4">
                     <Button 
                        onClick={() => {
                          setContributionType("DEPOSIT");
                          setContributionModalOpen(true);
                        }}
                        className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold py-6 rounded-xl text-md transition-transform active:scale-95"
                     >
                        <Plus className="mr-2" /> Depositar
                     </Button>
                     <Button 
                        variant="outline" 
                        onClick={() => {
                          setContributionType("WITHDRAW");
                          setContributionModalOpen(true);
                        }}
                        className="border-white/10 hover:bg-white/5 text-white py-6 rounded-xl text-md"
                     >
                        <Minus className="mr-2" /> Sacar
                     </Button>
                 </div>

            </div>

            <PlanningWidget goalId={id} />

            {/* SUB-GOALS LIST */}
            {goal.children && goal.children.length > 0 && (
                <div className="space-y-4">
                     <h3 className="text-xl font-bold text-white flex items-center justify-between">
                        <span>Sub-metas</span>
                        {goal.distributionStrategy && (
                            <span className="text-xs font-normal px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                Distribuição: {goal.distributionStrategy === "PROPORTIONAL" ? "Proporcional" : "Sequencial"}
                            </span>
                        )}
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {goal.children.map(child => {
                             const childPercent = Math.min(100, Math.round((child.currentAmount / child.targetAmount) * 100));
                             return (
                                 <div 
                                    key={child.id}
                                    onClick={() => router.push(`/dashboard/goals/${child.id}`)}
                                    className="bg-[#0b1215] border border-white/5 p-4 rounded-xl hover:border-[#32d6a5]/30 cursor-pointer transition-colors group"
                                  >
                                     <div className="flex justify-between items-start mb-3">
                                         <div className="flex items-center gap-3">
                                             <div className="p-2 rounded-lg bg-[#131b20] text-lg">
                                                 {child.icon || "🎯"}
                                             </div>
                                             <div>
                                                 <h4 className="font-bold text-gray-200 group-hover:text-[#32d6a5] transition-colors">{child.name}</h4>
                                                 <p className="text-xs text-gray-500">
                                                     {child.currentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {child.targetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                 </p>
                                             </div>
                                         </div>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                         <div 
                                              className="h-full bg-[#32d6a5] rounded-full" 
                                              style={{ width: `${childPercent}%` }}
                                         />
                                     </div>
                                 </div>
                             )
                         })}
                     </div>
                </div>
            )}

            {/* VISUALIZATION / IMAGE UPLOAD */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${styles.glassCard} flex flex-col items-center justify-center text-center relative border-dashed border-2 border-white/10 hover:border-[#32d6a5]/50 transition-colors cursor-pointer group min-h-[300px]`}>
                     {goal.imageUrl ? (
                         <div className="relative w-full h-full rounded-2xl overflow-hidden">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={goal.imageUrl} alt="Goal visual" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <span className="text-white font-bold">Alterar Imagem</span>
                             </div>
                         </div>
                     ) : (
                         <div className="space-y-4">
                             <div className="w-16 h-16 rounded-full bg-[#131b20] flex items-center justify-center mx-auto group-hover:bg-[#32d6a5]/10 group-hover:text-[#32d6a5] transition-colors">
                                 <Upload size={24} className="text-gray-400 group-hover:text-[#32d6a5]" />
                             </div>
                             <div>
                                 <h4 className="font-bold text-gray-300">Adicionar Imagem</h4>
                                 <p className="text-xs text-gray-500 mt-1 px-4">Arraste uma imagem ou clique para selecionar</p>
                             </div>
                             <Button size="sm" variant="outline" className="border-white/10 text-gray-300">
                                <Camera size={14} className="mr-2" /> Escolher Arquivo
                             </Button>
                         </div>
                     )}
                     <div className="hidden">
                        <ImageUpload 
                           goalId={id} 
                           currentImageUrl={goal.imageUrl} 
                           onUploadSuccess={() => { window.location.reload(); }} 
                        />
                     </div>
                </div>
                
                {/* Empty placeholder for future chart */}
                {/* AI Forecast & Chart Placeholder */}
                <div className="flex flex-col gap-6">
                    <GoalForecast goalId={id} />
                    
                    <div className={`${styles.glassCard} flex items-center justify-center min-h-[150px]`}>
                         <p className="text-gray-600 text-sm">Gráfico de evolução em breve...</p>
                    </div>
                </div>
             </div>
        </div>

        {/* RIGHT COLUMN: PURCHASE LINKS */}
        <div className="space-y-6">
           <PurchaseLinksManager 
              links={goal.purchaseLinks || []} 
              onAdd={async (data) => { await addLink({ goalId: id, data }); }}
              onUpdate={async (linkId, data) => { await updateLink({ goalId: id, linkId, data }); }}
              onDelete={async (linkId) => { await deleteLink({ goalId: id, linkId }); }}
           />
        </div>

      </div>

      {/* Contribution Modal */}
      <Dialog open={contributionModalOpen} onOpenChange={setContributionModalOpen}>
        <DialogContent className="bg-[#0f172a] text-white border-[#1e293b]">
          <DialogHeader>
            <DialogTitle>
              {contributionType === "DEPOSIT" ? "Adicionar Dinheiro" : "Retirar Dinheiro"}
            </DialogTitle>
            <DialogDescription>
              {contributionType === "DEPOSIT" 
                ? "Quanto você quer guardar hoje?" 
                : "Quanto você precisa retirar?"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContribution} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                autoFocus
                className="bg-[#1e293b] border-[#334155] text-white text-lg font-bold"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              variant={contributionType === "DEPOSIT" ? "primary" : "destructive"}
              disabled={isContributing}
            >
              {isContributing ? <Loader2 className="animate-spin" /> : "Confirmar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
