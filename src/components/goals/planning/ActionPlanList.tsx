import { ActionPlanItem } from "@/types/planning";
import { Scissors, Clock, DollarSign } from "lucide-react";

interface Props {
  actions: ActionPlanItem[];
}

export function ActionPlanList({ actions }: Props) {
  if (actions.length === 0) return null;

  const icons = {
    CUT: <Scissors className="text-red-400" size={18} />,
    SAVE: <Clock className="text-blue-400" size={18} />,
    EARN: <DollarSign className="text-green-400" size={18} />,
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-300">Ações Sugeridas</h4>
      {actions.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="p-2 bg-black/20 rounded-full mt-1">
            {icons[item.type]}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <p className="font-bold text-white text-sm">{item.title}</p>
              {item.value && (
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded whitespace-nowrap ml-2">
                  R$ {item.value.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
