"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Recommendation as RecommendationType,
  RecommendationType as RecTypeEnum,
} from "@/types/api";
import {
  CheckCircle2,
  XCircle,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { useApplyRecommendation, useDismissRecommendation } from "@/hooks/useRecommendations";
import { toast } from "sonner";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RecommendationCard({ item }: { item: RecommendationType }) {
  const { mutate: apply, isPending: isApplying } = useApplyRecommendation();
  const { mutate: dismiss, isPending: isDismissing } = useDismissRecommendation();
  const [isDone, setIsDone] = useState(false);

  const handleApply = () => {
    apply(item.id, {
      onSuccess: () => {
        toast.success("Recomendação aplicada!");
        setIsDone(true);
      },
      onError: () => toast.error("Erro ao aplicar."),
    });
  };

  const handleDismiss = () => {
    dismiss(item.id, {
      onSuccess: () => {
        toast.info("Recomendação dispensada.");
        setIsDone(true);
      },
    });
  };

  if (isDone) return null; // Animate out ideally

  const getIcon = () => {
    switch (item.type) {
      case RecTypeEnum.SPENDING_CUT:
        return <TrendingDown size={20} className="text-red-400" />;
      case RecTypeEnum.BUDGET_ADJUST:
        return <Wallet size={20} className="text-yellow-400" />;
      case RecTypeEnum.INVESTMENT:
        return <TrendingUp size={20} className="text-[#32d6a5]" />;
      case RecTypeEnum.DEBT_REDUCTION:
        return <AlertTriangle size={20} className="text-orange-400" />;
      case RecTypeEnum.SAVING_OPPORTUNITY:
        return <PiggyBank size={20} className="text-blue-400" />;
      default:
        return <Lightbulb size={20} className="text-purple-400" />;
    }
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case RecTypeEnum.SPENDING_CUT:
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case RecTypeEnum.BUDGET_ADJUST:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case RecTypeEnum.INVESTMENT:
        return "bg-[#32d6a5]/10 text-[#32d6a5] border-[#32d6a5]/20";
      case RecTypeEnum.DEBT_REDUCTION:
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const typeLabel = {
      [RecTypeEnum.SPENDING_CUT]: "Corte de Gastos",
      [RecTypeEnum.BUDGET_ADJUST]: "Ajuste de Orçamento",
      [RecTypeEnum.INVESTMENT]: "Investimento",
      [RecTypeEnum.DEBT_REDUCTION]: "Redução de Dívida",
      [RecTypeEnum.SAVING_OPPORTUNITY]: "Economia",
  }[item.type];

  return (
    <Card className="p-5 bg-[#0f172a]/40 border-white/5 backdrop-blur-sm hover:border-white/10 transition-all group relative overflow-hidden">
      <div className="flex gap-4">
        {/* Icon Box */}
        <div className={`p-3 rounded-xl h-fit ${getBadgeColor()} border-0 bg-opacity-20`}>
          {getIcon()}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-white leading-tight">
              {item.title}
            </h3>
            <Badge variant="outline" className={`ml-2 whitespace-nowrap ${getBadgeColor()}`}>
                {typeLabel}
            </Badge>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                Impacto
              </span>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-4 rounded-full ${
                      i <= item.impact ? "bg-[#32d6a5]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                Dificuldade
              </span>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-4 rounded-full ${
                      i <= item.difficulty ? "bg-orange-500" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        onClick={handleDismiss}
                        disabled={isDismissing || isApplying}
                        className="text-gray-500 hover:text-white hover:bg-white/5"
                    >
                        <XCircle size={18} className="mr-2" />
                        Dispensar
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Remover esta sugestão</TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <Button
            onClick={handleApply}
            disabled={isDismissing || isApplying}
            className="bg-[#32d6a5] text-[#020809] hover:bg-[#25b58a] font-bold shadow-[0_0_15px_rgba(50,214,165,0.2)]"
        >
            <CheckCircle2 size={18} className="mr-2" />
            Aplicar
        </Button>
      </div>
    </Card>
  );
}
