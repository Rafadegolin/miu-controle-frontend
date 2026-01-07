"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Smartphone,
  BellRing,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SessionManager } from "@/components/settings/SessionManager";

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (activeSection === "security") {
    return (
      <div className={styles.scrollableArea}>
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="p-2 h-10 w-10 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl"
            >
              <ChevronLeft size={20} />
            </Button>
            <div>
               <h2 className="text-2xl font-bold text-white">Segurança</h2>
               <p className="text-sm text-gray-400">Gerencie suas sessões e privacidade</p>
            </div>
          </div>
          
          <div className="grid gap-6 animate-slide-up-fade">
            <SessionManager />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.scrollableArea}>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Configurações</h2>
           <p className="text-gray-400">Personalize sua experiência no aplicativo</p>
        </div>

        <div className="space-y-4">
          {[
            {
              id: "appearance",
              icon: Smartphone,
              label: "Aparência do App",
              sub: "Tema, ícones e cores",
            },
            {
              id: "notifications",
              icon: BellRing,
              label: "Notificações",
              sub: "Alertas de gastos e metas",
              active: true,
            },
            { 
              id: "security",
              icon: Lock, 
              label: "Segurança", 
              sub: "Sessões ativas, Senha e Dados" 
            },
            {
              id: "help",
              icon: HelpCircle,
              label: "Ajuda e Suporte",
              sub: "Fale com a gente",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group flex items-center justify-between p-5 rounded-2xl bg-[#06181b] border border-white/10 cursor-pointer hover:border-[#32d6a5]/50 hover:bg-[#082025] transition-all duration-300 relative overflow-hidden"
              onClick={() => item.id === "security" && setActiveSection("security")}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-[#32d6a5]/0 via-[#32d6a5]/5 to-[#32d6a5]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

              <div className="flex items-center gap-5 relative z-10">
                <div className="p-3.5 bg-[#32d6a5]/10 text-[#32d6a5] rounded-xl group-hover:bg-[#32d6a5] group-hover:text-[#020809] transition-colors shadow-[0_0_15px_rgba(50,214,165,0.1)] group-hover:shadow-[0_0_20px_rgba(50,214,165,0.4)]">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-0.5">
                    {item.label}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                {item.active && (
                  <span className="text-xs font-bold text-[#32d6a5] bg-[#32d6a5]/10 px-3 py-1.5 rounded-lg border border-[#32d6a5]/20">
                    Ativo
                  </span>
                )}
                <ChevronRight size={20} className="text-gray-600 group-hover:text-[#32d6a5] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 mt-8 h-14 rounded-2xl border border-transparent hover:border-red-500/20 text-base font-bold transition-all"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" /> Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
