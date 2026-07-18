"use client";

import { MessageCircle, Camera, Mic, Type, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

const STEPS = [
  {
    icon: Type,
    title: "Mande uma mensagem",
    desc: 'Escreva algo como "gastei 45 no mercado" e o Miu registra a transação para você.',
  },
  {
    icon: Camera,
    title: "Envie a foto do recibo",
    desc: "Tire uma foto do comprovante e o Miu extrai valor, data e estabelecimento automaticamente.",
  },
  {
    icon: Mic,
    title: "Ou mande um áudio",
    desc: "Fale a transação e deixe o Miu transcrever e categorizar sozinho.",
  },
];

export default function WhatsAppPage() {
  return (
    <div className="space-y-8 animate-fade-in-up pb-10 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
          <MessageCircle size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Miu no WhatsApp</h2>
          <p className="text-gray-400">
            Registre gastos sem abrir o app — direto na sua conversa.
          </p>
        </div>
      </div>

      <Card className="bg-linear-to-br from-[#0e4b51] to-[#0b1215] border-white/5 p-6">
        <p className="text-gray-200 leading-relaxed">
          As transações enviadas pelo WhatsApp entram automaticamente na sua conta
          com a etiqueta{" "}
          <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-1.5 py-0.5 text-[11px] font-medium text-green-400">
            <MessageCircle size={11} /> WhatsApp
          </span>
          , já categorizadas pela IA. É só conferir depois aqui no painel.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.title}
              className="bg-[#0b1215] border border-white/5 p-5 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#32d6a5]/10 grid place-items-center text-[#32d6a5]">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-white text-sm">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#0b1215] border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">Como conectar</h3>
          <p className="text-gray-400 text-sm mt-1">
            Fale com o suporte para receber o número oficial do Miu e vincular seu
            WhatsApp à sua conta.
          </p>
        </div>
        <a
          href="/dashboard/feedback"
          className="inline-flex items-center gap-2 rounded-lg bg-[#32d6a5] px-4 py-2 text-sm font-semibold text-[#020809] whitespace-nowrap"
        >
          Falar com o suporte <ArrowRight size={16} />
        </a>
      </Card>
    </div>
  );
}
