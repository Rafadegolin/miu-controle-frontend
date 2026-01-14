"use client";

import { Button } from "@/components/ui/Button";
import { Plus, Brain, Bell } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
       {/* HEADER */}
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Investimentos</h2>
            <p className="text-gray-400 text-sm">Acompanhe sua carteira e rendimentos.</p>
          </div>
          <Button className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold rounded-lg">
             <Plus size={18} className="mr-2" /> Novo Aporte
          </Button>
       </div>

       {/* AI INSIGHTS BANNER */}
       <div className="bg-linear-to-r from-[#0e4b51] to-[#2c6e75] rounded-2xl p-6 relative overflow-hidden border border-white/5">
          <div className="relative z-10 flex gap-4">
             <div className="p-3 bg-white/10 rounded-xl h-fit backdrop-blur-sm">
                <Brain className="text-[#32d6a5]" size={24} />
             </div>
             <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                   <h3 className="text-white font-bold text-lg">Miu AI Insights</h3>
                   <span className="bg-[#32d6a5] text-[#020809] text-[10px] font-bold px-1.5 py-0.5 rounded">BETA</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                   Identifiquei que você tem <strong className="text-[#32d6a5]">R$ 15.000</strong> parados na conta corrente. Se aplicar no Tesouro Selic hoje, você pode ganhar aproximadamente <strong className="text-[#32d6a5]">R$ 130,00</strong> a mais por mês sem risco.
                </p>
                <div className="flex gap-3 pt-2">
                   <Button size="sm" className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold border-none">
                      Simular Agora
                   </Button>
                   <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                      Dispensar
                   </Button>
                </div>
             </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-[#32d6a5]/10 to-transparent pointer-events-none" />
       </div>

       {/* ASSET CARDS */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Tesouro Selic */}
          <Card className="bg-[#0b1215] border border-white/5 p-6 rounded-2xl relative group hover:border-[#32d6a5]/30 transition-all">
             <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#32d6a5] flex items-center justify-center text-[#020809] font-bold text-sm">
                      T
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm">Tesouro Selic 2027</h4>
                      <p className="text-gray-500 text-xs">Renda Fixa</p>
                   </div>
                </div>
                <span className="text-[#32d6a5] text-xs font-bold">+12.5%</span>
             </div>

             <div className="flex justify-between items-end">
                <div>
                   <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">SALDO</p>
                   <p className="text-[#32d6a5] font-bold text-xl">R$ 12.500</p>
                </div>
                {/* Mini Sparkline svg */}
                <svg className="w-20 h-8 text-[#32d6a5]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M0 30 Q 20 28, 40 32 T 80 25 T 100 20" />
                </svg>
             </div>
          </Card>

          {/* Card 2: ETF */}
          <Card className="bg-[#0b1215] border border-white/5 p-6 rounded-2xl relative group hover:border-[#32d6a5]/30 transition-all">
             <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#00404f] flex items-center justify-center text-white font-bold text-sm">
                      I
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm">IVVB11</h4>
                      <p className="text-gray-500 text-xs">ETF</p>
                   </div>
                </div>
                <span className="text-[#32d6a5] text-xs font-bold">+4.2%</span>
             </div>

             <div className="flex justify-between items-end">
                <div>
                   <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">SALDO</p>
                   <p className="text-[#32d6a5] font-bold text-xl">R$ 8.400</p>
                </div>
                 <svg className="w-20 h-8 text-[#32d6a5]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M0 35 Q 25 35, 50 30 T 100 25" />
                </svg>
             </div>
          </Card>

          {/* Card 3: Crypto */}
          <Card className="bg-[#0b1215] border border-white/5 p-6 rounded-2xl relative group hover:border-red-500/30 transition-all">
             <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold text-sm">
                      B
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm">Bitcoin</h4>
                      <p className="text-gray-500 text-xs">Cripto</p>
                   </div>
                </div>
                <span className="text-red-500 text-xs font-bold">-2.1%</span>
             </div>

             <div className="flex justify-between items-end">
                <div>
                   <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">SALDO</p>
                   <p className="text-gray-300 font-bold text-xl">R$ 4.200</p>
                </div>
                 <svg className="w-20 h-8 text-red-500" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M0 25 Q 25 28, 50 25 T 100 28" />
                </svg>
             </div>
          </Card>

       </div>
    </div>
  );
}
