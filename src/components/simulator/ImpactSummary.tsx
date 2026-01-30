import { InflationImpact } from "@/types/inflation";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface Props {
  impact: InflationImpact;
}

export function ImpactSummary({ impact }: Props) {
  const isGain = (impact.realGain || 0) >= 0;
  const purchasingPowerLoss = 1000 - impact.purchasingPowerProjected;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Real Gain Card */}
      <div className={`p-4 rounded-xl border ${isGain ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
        <p className="text-sm font-medium text-gray-400">Ganho Real</p>
        <div className="flex items-center gap-2 mt-1">
          {isGain ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
          <span className={`text-2xl font-bold ${isGain ? 'text-green-400' : 'text-red-400'}`}>
            {impact.realGain > 0 ? "+" : ""}{(impact.realGain || 0).toFixed(2)}%
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {isGain 
            ? "Seus reajustes superam a inflação projetada." 
            : "Sua renda não acompanha o aumento dos preços."}
        </p>
      </div>

      {/* Purchasing Power Card */}
      <div className="p-4 rounded-xl border bg-white/5 border-white/10">
        <p className="text-sm font-medium text-gray-400">Poder de Compra (de R$ 1000)</p>
        <div className="flex items-center gap-2 mt-1">
          <AlertTriangle className="text-orange-500" />
          <span className="text-2xl font-bold text-white">
            {formatCurrency(impact.purchasingPowerProjected)}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
           Você perde <span className="text-red-400">{formatCurrency(purchasingPowerLoss)}</span> em 'poder de fogo' nesse período.
        </p>
      </div>
    </div>
  );
}
