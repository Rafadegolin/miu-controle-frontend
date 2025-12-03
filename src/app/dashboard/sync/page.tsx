"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Check,
  X,
  Plus,
  Banknote,
  Zap,
  BellRing,
  ScanLine,
  Camera,
} from "lucide-react";

export default function SyncPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#00404f]">
        Conexões & Sincronização
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-[#00404f] mb-4 flex items-center gap-2">
            <Banknote size={18} /> Open Finance
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Nubank",
                status: "connected",
                time: "2 min atrás",
                color: "#820AD1",
              },
              {
                name: "Inter",
                status: "connected",
                time: "1 hora atrás",
                color: "#FF7A00",
              },
              {
                name: "Itaú",
                status: "error",
                time: "Falha na conexão",
                color: "#004990",
              },
            ].map((bank, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-[#00404f]/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00404f]">
                      {bank.name}
                    </p>
                    <p className="text-xs text-[#00404f]/50">{bank.time}</p>
                  </div>
                </div>
                {bank.status === "connected" ? (
                  <span className="text-xs font-bold text-[#007459] bg-[#007459]/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <Check size={10} /> Ativo
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[#ff6b6b] bg-[#ff6b6b]/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <X size={10} /> Erro
                  </span>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              <Plus size={16} /> Conectar Instituição
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#00404f] mb-4 flex items-center gap-2">
            <Zap size={18} className="text-[#ffd166]" /> Automação Miu
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#00404f]/5">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#00404f] flex items-center gap-2">
                  <BellRing size={16} /> Leitor de Notificações
                </span>
                <div className="w-8 h-4 bg-[#007459] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-[#00404f]/60">
                Detecta automaticamente pushs de apps bancários e cria
                transações.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#00404f]/5">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#00404f] flex items-center gap-2">
                  <ScanLine size={16} /> Scanner OCR (Notas)
                </span>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Histórico
                </Button>
              </div>
              <p className="text-xs text-[#00404f]/60 mb-3">
                Tire foto de cupons fiscais para registrar gastos em dinheiro.
              </p>
              <Button variant="secondary" className="w-full border-dashed">
                <Camera size={16} /> Abrir Câmera
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
