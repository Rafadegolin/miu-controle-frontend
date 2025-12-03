"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MOCK_GOALS } from "@/lib/constants";
import { Plus, Target } from "lucide-react";

export default function GoalsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#00404f]">Metas Financeiras</h2>
        <Button variant="primary">
          <Plus size={16} /> Nova Meta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_GOALS.map((goal) => {
          const progress = (goal.current / goal.target) * 100;

          return (
            <Card key={goal.id} hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{goal.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#00404f]">{goal.name}</h3>
                  <p className="text-xs text-[#00404f]/50">
                    Meta: {goal.deadline}
                  </p>
                </div>
                <Target size={20} className="text-[#ffd166]" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#00404f]/60">Progresso</span>
                  <span className="font-bold text-[#00404f]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-[#F8FAFC] h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ffd166] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#00404f]/60 mt-2">
                  <span>R$ {goal.current.toLocaleString()}</span>
                  <span>R$ {goal.target.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
