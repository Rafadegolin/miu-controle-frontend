import { Feedback } from "@/types/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bug, Lightbulb, MessageSquare, CheckCircle, Clock, XCircle, PlayCircle } from "lucide-react";

interface FeedbackListProps {
  feedbacks: Feedback[];
  emptyMessage?: string;
  onSelect?: (feedback: Feedback) => void;
}

const statusConfig = {
    PENDING: { label: "Pendente", icon: Clock, color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/20" },
    IN_PROGRESS: { label: "Em Análise", icon: PlayCircle, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    RESOLVED: { label: "Resolvido", icon: CheckCircle, color: "text-[#32d6a5]", bg: "bg-[#32d6a5]/10", border: "border-[#32d6a5]/20" },
    REJECTED: { label: "Fechado", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
};

const typeConfig = {
    BUG: { icon: Bug, color: "text-red-400" },
    SUGGESTION: { icon: Lightbulb, color: "text-yellow-400" },
    OTHER: { icon: MessageSquare, color: "text-blue-400" },
};

export function FeedbackList({ feedbacks, emptyMessage = "Nenhum feedback encontrado.", onSelect }: FeedbackListProps) {
  if (!feedbacks || feedbacks.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare size={48} className="text-gray-700 mb-4" />
              <p className="text-gray-500">{emptyMessage}</p>
          </div>
      );
  }

  return (
    <div className="space-y-3">
        {feedbacks.map(item => {
            const StatusIcon = statusConfig[item.status]?.icon || Clock;
            const TypeIcon = typeConfig[item.type]?.icon || MessageSquare;

            return (
                <div 
                    key={item.id} 
                    className={`bg-[#0b1215] border border-white/5 rounded-xl p-4 transition-all hover:bg-white/5 ${onSelect ? 'cursor-pointer' : ''}`}
                    onClick={() => onSelect && onSelect(item)}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-white/5 ${typeConfig[item.type].color}`}>
                                <TypeIcon size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-200">{item.title}</h4>
                                <span className="text-xs text-gray-500">{format(new Date(item.createdAt), "PPP 'às' HH:mm", { locale: ptBR })}</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[item.status].bg} ${statusConfig[item.status].color} ${statusConfig[item.status].border}`}>
                            <StatusIcon size={12} />
                            {statusConfig[item.status].label}
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                        {item.description}
                    </p>

                    {item.adminResponse && (
                        <div className="bg-white/5 rounded-lg p-3 text-sm border-l-2 border-[#32d6a5]">
                            <p className="text-[#32d6a5] font-bold text-xs mb-1">Resposta do Admin</p>
                            <p className="text-gray-300">{item.adminResponse}</p>
                        </div>
                    )}
                </div>
            );
        })}
    </div>
  );
}
