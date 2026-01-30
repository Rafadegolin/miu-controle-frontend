"use client";

import { useEffect, useState } from "react";
import { feedbackActions } from "@/services/feedback.actions";
import { Feedback } from "@/types/api";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackFormModal } from "@/components/feedback/FeedbackFormModal";
import { Button } from "@/components/ui/Button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadFeedbacks = async () => {
    try {
        const data = await feedbackActions.getUserFeedbacks();
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

  return (
    <div className="space-y-6 animate-fade-in-up pb-20 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-white">Feedback & Suporte</h2>
                <p className="text-gray-400">Acompanhe seus tickets enviados ou abra uma nova solicitação.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold">
                <Plus className="mr-2" size={18} /> Novo Feedback
            </Button>
        </div>

        {isLoading ? (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
            </div>
        ) : (
            <FeedbackList feedbacks={feedbacks} emptyMessage="Você ainda não enviou nenhum feedback." />
        )}

        <FeedbackFormModal 
            open={isModalOpen} 
            onOpenChange={setIsModalOpen} 
            onSuccess={loadFeedbacks} 
        />
    </div>
  );
}
