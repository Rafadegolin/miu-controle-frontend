"use client";

import { useState } from "react";
import { useRecurringTransactions } from "@/hooks/useRecurring";
import { RecurringCard } from "@/components/recurring/RecurringCard";
import { CreateRecurringModal } from "@/components/recurring/CreateRecurringModal";
import { Button } from "@/components/ui/Button";
import { Plus, Filter, RefreshCw, Layers } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function RecurringPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "paused">("all");
  
  // Fetch all transactions? passing undefined usually means all if backend supports it
  // Or handle filtering client side for smoother UX if list is small. 
  // Let's rely on client side filtering for better UX for now as list won't be huge.
  const { data: transactions, isLoading } = useRecurringTransactions();

  const filteredTransactions = transactions?.filter(t => {
      if (filter === "active") return t.isActive;
      if (filter === "paused") return !t.isActive;
      return true;
  });

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Assinaturas & Recorrências
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Gerencie seus pagamentos automáticos e previsões
          </p>
        </div>
        
        <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-[#32d6a5] hover:bg-[#25b58a] text-[#020809] font-bold shadow-[0_0_20px_rgba(50,214,165,0.2)] transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Recorrência
        </Button>
      </div>

      {/* Filters & Stats Bar */}
      <div className="flex flex-col md:flex-row gap-4">
          <div className="flex p-1 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 w-fit">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter("all")}
                className={`${filter === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-all rounded-md`}
            >
                <Layers size={14} className="mr-2" />
                Todos
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter("active")}
                className={`${filter === 'active' ? 'bg-white/10 text-[#32d6a5] shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-all rounded-md`}
            >
                <div className={`w-2 h-2 rounded-full bg-[#32d6a5] mr-2 ${filter === 'active' ? 'shadow-[0_0_8px_rgba(50,214,165,0.5)]' : ''}`} />
                Ativos
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter("paused")}
                className={`${filter === 'paused' ? 'bg-white/10 text-yellow-400 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-all rounded-md`}
            >
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />
                Pausados
            </Button>
          </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loading
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse border border-white/10" />
          ))
        ) : filteredTransactions?.length === 0 ? (
           <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl bg-white/5 backdrop-blur-sm">
              <Layers className="mx-auto h-12 w-12 text-gray-700 mb-4" />
              <p className="text-lg font-medium text-gray-400">Nenhuma recorrência encontrada</p>
              <p className="text-sm">Crie uma nova para começar a automatizar.</p>
           </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTransactions?.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <RecurringCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <CreateRecurringModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
