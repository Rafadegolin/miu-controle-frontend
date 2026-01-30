"use client";

import { useEffect, useState } from "react";
import { feedbackActions } from "@/services/feedback.actions";
import { Feedback, FeedbackStatus } from "@/types/api";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseStatus, setResponseStatus] = useState<FeedbackStatus>("PENDING");
  const [responseText, setResponseText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const loadFeedbacks = async () => {
    setIsLoading(true);
    try {
        const data = await feedbackActions.getAllFeedbacks();
        setFeedbacks(data);
    } catch (error) {
        toast.error("Erro ao carregar feedbacks.");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleOpenDetail = (feedback: Feedback) => {
      setSelectedFeedback(feedback);
      setResponseStatus(feedback.status);
      setResponseText(feedback.adminResponse || "");
  };

  const handleSaveUpdate = async () => {
      if (!selectedFeedback) return;
      setIsUpdating(true);
      try {
          await feedbackActions.updateFeedbackStatus(selectedFeedback.id, {
              status: responseStatus,
              adminResponse: responseText
          });
          toast.success("Status atualizado!");
          setSelectedFeedback(null);
          loadFeedbacks();
      } catch (e) {
          toast.error("Erro ao atualizar.");
      } finally {
          setIsUpdating(false);
      }
  };

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
        <div>
            <h2 className="text-2xl font-bold text-white">Gestão de Feedbacks</h2>
            <p className="text-gray-400"> visualize e responda aos tickets dos usuários.</p>
        </div>

        {isLoading ? (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
            </div>
        ) : (
            <div className="flex-1 overflow-auto">
                 <FeedbackList 
                    feedbacks={feedbacks} 
                    onSelect={handleOpenDetail} 
                    emptyMessage="Nenhum feedback recebido."
                 />
            </div>
        )}

        {/* Detail/Edit Modal */}
        <Dialog open={!!selectedFeedback} onOpenChange={(o) => !o && setSelectedFeedback(null)}>
            <DialogContent className="bg-[#0b1215] border border-white/10 text-white sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Detalhes do Feedback</DialogTitle>
                </DialogHeader>
                
                {selectedFeedback && (
                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between">
                                <span className="font-bold text-[#32d6a5]">{selectedFeedback.type}</span>
                                <span className="text-xs text-gray-400">{new Date(selectedFeedback.createdAt).toLocaleString()}</span>
                            </div>
                            <h3 className="font-bold text-lg">{selectedFeedback.title}</h3>
                            <p className="text-gray-300 text-sm whitespace-pre-wrap">{selectedFeedback.description}</p>
                            <p className="text-xs text-gray-500 mt-2">Enviado por: {selectedFeedback.user?.fullName} ({selectedFeedback.userId})</p>
                        </div>
                        
                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div>
                                <label className="text-sm font-bold text-gray-400 mb-1 block">Status</label>
                                <Select value={responseStatus} onValueChange={(v: FeedbackStatus) => setResponseStatus(v)}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                                        <SelectItem value="PENDING">Pendente</SelectItem>
                                        <SelectItem value="IN_PROGRESS">Em Análise</SelectItem>
                                        <SelectItem value="RESOLVED">Resolvido</SelectItem>
                                        <SelectItem value="REJECTED">Rejeitado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-400 mb-1 block">Resposta Administrativa</label>
                                <Textarea 
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                    placeholder="Escreva uma resposta para o usuário..."
                                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                />
                            </div>
                        </div>
                        
                        <DialogFooter className="gap-2">
                             <Button variant="outline" onClick={() => setSelectedFeedback(null)} className="border-white/10 text-gray-400 hover:text-white">Cancelar</Button>
                             <Button onClick={handleSaveUpdate} disabled={isUpdating} className="bg-[#32d6a5] text-black font-bold">
                                 {isUpdating && <Loader2 className="animate-spin mr-2"/>} Salvar Alterações
                             </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    </div>
  );
}
