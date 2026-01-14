"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch"; // Assuming we have a Switch component or will use a simple one
import { Plus, Link as LinkIcon, Smartphone, Camera, Bell, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import styles from "@/components/dashboard/styles/Dashboard.module.css";

export default function SyncPage() {
  const [isPushEnabled, setIsPushEnabled] = useState(true);

  // Mock data for Open Finance connections
  const connections = [
    { id: 1, name: "Nubank", status: "active", lastSync: "2 min atrás", color: "bg-[#820ad1]" },
    { id: 2, name: "Inter", status: "active", lastSync: "1 hora atrás", color: "bg-[#ff7a00]" },
    { id: 3, name: "Itaú", status: "error", lastSync: "Falha na conexão", color: "bg-[#ec7000]" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-20">
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Conexões & Hub</h2>
        <p className="text-gray-400 text-sm">Gerencie suas conexões bancárias e automações.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* OPEN FINANCE COLUMN */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 text-[#32d6a5] font-bold mb-2">
              <LinkIcon size={18} />
              <h3>Open Finance</h3>
           </div>

           <div className={`${styles.glassCard} min-h-[400px] flex flex-col`}>
              <div className="space-y-4 flex-1">
                 {connections.map((conn) => (
                    <div key={conn.id} className="group flex items-center justify-between p-4 rounded-xl bg-[#131b20] border border-transparent hover:border-white/10 transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${conn.color}`}>
                             {conn.name[0]}
                          </div>
                          <div>
                             <h4 className="font-bold text-white">{conn.name}</h4>
                             <p className={`text-xs ${conn.status === 'error' ? 'text-red-400' : 'text-gray-500'}`}>
                                {conn.lastSync}
                             </p>
                          </div>
                       </div>
                       
                       <div>
                          {conn.status === 'active' ? (
                             <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-500 flex items-center gap-1">
                                <CheckCircle size={12} /> Ativo
                             </span>
                          ) : (
                             <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-500 flex items-center gap-1">
                                <XCircle size={12} /> Erro
                             </span>
                          )}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                 <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                    <Plus size={16} className="mr-2" /> Conectar Instituição
                 </Button>
              </div>
           </div>
        </section>

        {/* AUTOMATION COLUMN */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 text-[#32d6a5] font-bold mb-2">
              <Smartphone size={18} />
              <h3>Automação Miu</h3>
           </div>

           <div className="space-y-4">
              {/* Push Notification Scanner */}
              <div className={`${styles.glassCard} flex flex-col gap-4 relative overflow-hidden group hover:border-[#32d6a5]/30 transition-all`}>
                 <div className="flex justify-between items-start z-10">
                    <div className="flex gap-4">
                       <div className="p-3 bg-white/10 rounded-xl text-white h-fit">
                          <Bell size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-white text-lg">Leitor de Notificações</h4>
                          <p className="text-gray-400 text-sm mt-1 max-w-sm">
                             Detecta automaticamente pushs de apps bancários e cria transações sem você precisar abrir o app.
                          </p>
                       </div>
                    </div>
                    <Switch checked={isPushEnabled} onCheckedChange={setIsPushEnabled} className="data-[state=checked]:bg-[#32d6a5]" />
                 </div>
              </div>

              {/* OCR Scanner */}
              <div className={`${styles.glassCard} flex flex-col gap-4 relative overflow-hidden group hover:border-[#32d6a5]/30 transition-all`}>
                 <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                       <div className="p-3 bg-white/10 rounded-xl text-white h-fit">
                          <Camera size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-white text-lg">Scanner OCR (Notas)</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Tire foto de cupons fiscais para registrar gastos em dinheiro.
                          </p>
                       </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium cursor-pointer hover:text-white transition-colors">Histórico</span>
                 </div>
                 
                 <Button className="w-full bg-[#18181b] hover:bg-[#27272a] text-white py-6 rounded-xl font-bold mt-2">
                    <Camera size={20} className="mr-2" /> Abrir Câmera
                 </Button>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
