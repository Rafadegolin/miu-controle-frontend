"use client";

import { useEffect, useState } from "react";
import { getCacheStats, getSlowQueries, CacheStats, SlowQuery } from "@/services/admin.actions";
import { Card } from "@/components/ui/Card";
import { Loader2, Server, Database, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils"; // Not used here, but good practice for imports

export default function AdminSystemPage() {
  const [cache, setCache] = useState<CacheStats | null>(null);
  const [queries, setQueries] = useState<SlowQuery[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
        setLoading(true);
        const [c, q] = await Promise.all([getCacheStats(), getSlowQueries()]);
        setCache(c);
        setQueries(q);
    } catch (error) {
        toast.error("Erro ao carregar dados do sistema");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
      </div>
    );
  }

  if (!cache) return null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Monitoramento Técnico</h1>
          <p className="text-gray-400">Status do Cache Redis e Banco de Dados.</p>
        </div>
        
        <Button onClick={loadData} variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300">
            <RefreshCw size={16} className="mr-2" /> Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cache Stats Column */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Server className="text-orange-500" size={20} /> Redis Cache
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
                 <Card className="p-5 bg-[#0b1215] border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-white mb-1">{((cache.hits / (cache.hits + cache.misses)) * 100).toFixed(1)}%</span>
                    <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Hit Rate (Eficiência)</span>
                 </Card>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <Card className="p-4 bg-[#0b1215] border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Hits</p>
                        <p className="text-xl font-bold text-green-400">{cache.hits}</p>
                     </Card>
                     <Card className="p-4 bg-[#0b1215] border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Misses</p>
                        <p className="text-xl font-bold text-red-400">{cache.misses}</p>
                     </Card>
                     <Card className="p-4 bg-[#0b1215] border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Total Keys</p>
                        <p className="text-xl font-bold text-white">{cache.keys}</p>
                     </Card>
                     <Card className="p-4 bg-[#0b1215] border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Memory</p>
                        <p className="text-xl font-bold text-white">{cache.memoryUsage}</p>
                     </Card>
                 </div>
            </div>
        </div>

        {/* Slow Queries Column */}
        <div className="lg:col-span-2 space-y-6">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="text-blue-500" size={20} /> Slow Queries
            </h3>

            <Card className="bg-[#0b1215] border-white/5 overflow-hidden">
                <div className="divide-y divide-white/5">
                    {queries.map((q) => (
                        <div key={q.id} className="p-4 hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                                    {q.duration}ms
                                </span>
                                <div className="flex items-center text-gray-500 text-xs">
                                    <Clock size={12} className="mr-1" />
                                    {new Date(q.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                            <code className="block bg-black/50 p-3 rounded-lg text-xs font-mono text-gray-300 break-all">
                                {q.query}
                            </code>
                        </div>
                    ))}

                    {queries.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Nenhuma query lenta detectada recentemente.
                        </div>
                    )}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
