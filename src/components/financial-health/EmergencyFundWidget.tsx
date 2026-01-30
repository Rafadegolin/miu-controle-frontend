"use client";

import { useState } from "react";
import { EmergencyFund } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, ShieldX, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/progress";
import { FundOperationsModal } from "./FundOperationsModal";

interface EmergencyFundWidgetProps {
  fund: EmergencyFund;
  onUpdate: () => void;
}

export function EmergencyFundWidget({ fund, onUpdate }: EmergencyFundWidgetProps) {
  const [modalMode, setModalMode] = useState<"DEPOSIT" | "WITHDRAW" | null>(null);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "SECURE":
        return { color: "text-[#32d6a5]", bg: "bg-[#32d6a5]/10", icon: ShieldCheck, label: "Protegido" };
      case "WARNING":
        return { color: "text-yellow-500", bg: "bg-yellow-500/10", icon: ShieldAlert, label: "Atenção" };
      case "CRITICAL":
        return { color: "text-red-500", bg: "bg-red-500/10", icon: ShieldX, label: "Crítico" };
      default:
        return { color: "text-gray-400", bg: "bg-gray-500/10", icon: Info, label: "Desconhecido" };
    }
  };

  const statusInfo = getStatusInfo(fund.status);
  const StatusIcon = statusInfo.icon;
  const percentage = Math.min((fund.currentAmount / fund.targetAmount) * 100, 100);

  return (
    <div className="bg-[#0b1215] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-${statusInfo.color.split('-')[1]}-500/5 to-transparent blur-3xl`} />

      <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
        
        {/* Left: Main Info */}
        <div className="flex-1 space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${statusInfo.bg}`}>
                        <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Reserva de Emergência</h3>
                        <div className={`text-sm font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${statusInfo.bg} ${statusInfo.color} border border-white/5`}>
                            {statusInfo.label}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-end mb-2">
                    <p className="text-gray-400 text-sm">Cobertura Atual</p>
                    <p className="text-white font-bold text-lg">{fund.monthsCovered.toFixed(1)} <span className="text-sm font-normal text-gray-500">meses</span></p>
                </div>
                <Progress value={percentage} className="h-2 bg-white/5" />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0 meses</span>
                    <span>Meta ideal: 6 meses</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-400 mb-1">Saldo Atual</p>
                    <p className="text-xl font-bold text-white font-mono">{formatCurrency(fund.currentAmount)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-400 mb-1">Meta (6 meses)</p>
                    <p className="text-xl font-bold text-gray-400 font-mono">{formatCurrency(fund.targetAmount)}</p>
                </div>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col justify-center gap-3 border-l border-white/10 pl-6 md:w-48">
             <Button 
                onClick={() => setModalMode("DEPOSIT")}
                className="w-full bg-[#32d6a5] hover:bg-[#2bc496] text-black shadow-lg shadow-[#32d6a5]/20"
             >
                <TrendingUp className="mr-2 h-4 w-4" /> Aportar
             </Button>
             <Button 
                onClick={() => setModalMode("WITHDRAW")}
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/5 hover:text-red-400 hover:border-red-500/30 transition-colors"
             >
                <TrendingDown className="mr-2 h-4 w-4" /> Sacar
             </Button>
             
             <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs text-blue-300">
                <p className="flex gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                   <span>Mantenha sua reserva em liquidez diária (CDB, Tesouro Selic).</span>
                </p>
             </div>
        </div>
      </div>

      <FundOperationsModal 
        isOpen={!!modalMode}
        onClose={() => setModalMode(null)}
        mode={modalMode || "DEPOSIT"}
        onSuccess={onUpdate}
      />
    </div>
  );
}
