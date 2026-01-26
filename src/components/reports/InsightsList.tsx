import { DashboardInsight } from "@/types/api";
import { Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface InsightsListProps {
  insights: DashboardInsight[];
}

export function InsightsList({ insights }: InsightsListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "positive": return <CheckCircle className="text-[#32d6a5]" size={20} />;
      case "negative": return <AlertTriangle className="text-red-400" size={20} />;
      case "warning": return <AlertTriangle className="text-yellow-400" size={20} />;
      default: return <Info className="text-blue-400" size={20} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "positive": return "bg-[#32d6a5]/5 border-[#32d6a5]/20";
      case "negative": return "bg-red-400/5 border-red-400/20";
      case "warning": return "bg-yellow-400/5 border-yellow-400/20";
      default: return "bg-blue-400/5 border-blue-400/20";
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Lightbulb size={20} className="text-yellow-400" />
        Insights Automáticos
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.length > 0 ? (
          insights.map((insight, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-lg border ${getBgColor(insight.type)} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start gap-3">
                {getIcon(insight.type)}
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{insight.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{insight.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full">
            Nenhum insight gerado para este período. Tente aumentar o intervalo de datas.
          </p>
        )}
      </div>
    </div>
  );
}
