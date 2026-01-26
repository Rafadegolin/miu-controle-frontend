"use client";

import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { Loader2, Sparkles, CheckCircle } from "lucide-react";

export default function RecommendationsPage() {
  const { data: recommendations, isLoading } = useRecommendations();

  // Filter only active recommendations
  const activeRecommendations = recommendations?.filter(
    (rec) => rec.status === "ACTIVE"
  );

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
                 <Sparkles size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">Recomendações Inteligentes</h2>
          </div>
          <p className="text-gray-400">
            Insights para otimizar suas finanças baseados no seu comportamento.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#32d6a5]" size={40} />
          </div>
        ) : activeRecommendations && activeRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeRecommendations.map((rec) => (
              <RecommendationCard key={rec.id} item={rec} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/5 mx-auto max-w-2xl">
            <div className="bg-[#32d6a5]/10 p-6 rounded-full mb-4">
                <CheckCircle size={48} className="text-[#32d6a5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tudo Otimizado!</h3>
            <p className="text-gray-400 max-w-md">
              Você não possui recomendações pendentes no momento. Continue assim!
              Nosso consultor IA roda semanalmente procurando novas oportunidades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
