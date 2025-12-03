"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Smartphone,
  BellRing,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#00404f]">Configurações</h2>

      <div className="space-y-3">
        {[
          {
            icon: Smartphone,
            label: "Aparência do App",
            sub: "Tema, ícones e cores",
          },
          {
            icon: BellRing,
            label: "Notificações",
            sub: "Alertas de gastos e metas",
            active: true,
          },
          { icon: Lock, label: "Segurança", sub: "FaceID, Senha e Dados" },
          {
            icon: HelpCircle,
            label: "Ajuda e Suporte",
            sub: "Fale com a gente",
          },
        ].map((item, i) => (
          <Card
            key={i}
            hover
            className="flex items-center justify-between p-4! cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#F8FAFC] text-[#00404f] rounded-xl">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#00404f] text-sm">
                  {item.label}
                </h4>
                <p className="text-xs text-[#00404f]/50">{item.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {item.active && (
                <span className="text-xs font-bold text-[#007459] bg-[#007459]/10 px-2 py-1 rounded-full">
                  Ativo
                </span>
              )}
              <ChevronRight size={18} className="text-[#00404f]/30" />
            </div>
          </Card>
        ))}
        <Button
          variant="ghost"
          className="w-full text-[#ff6b6b] hover:text-[#ff6b6b] hover:bg-[#ff6b6b]/5 mt-6"
          onClick={handleLogout}
        >
          <LogOut size={18} /> Sair da Conta
        </Button>
      </div>
    </div>
  );
}
