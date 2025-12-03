"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#00404f]">Perfil</h2>

      <Card className="flex items-center gap-6 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#7cddb1] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative">
          <img
            src={user?.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#F8FAFC] shadow-lg"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-[#00404f] text-white rounded-full border-2 border-white shadow hover:scale-110 transition-transform">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#00404f]">{user?.name}</h3>
          <p className="text-[#00404f]/60 mb-3">{user?.email}</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#00404f]/5 text-[#00404f] rounded-lg text-xs font-bold border border-[#00404f]/10">
              Nível {user?.level}
            </span>
            <span className="px-3 py-1 bg-[#ffd166]/10 text-[#e0a800] rounded-lg text-xs font-bold border border-[#ffd166]/20">
              Streak {user?.streak} 🔥
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-bold text-[#00404f] mb-4">
            Informações Pessoais
          </h4>
          <div className="space-y-4">
            {["Nome Completo", "Email", "Telefone"].map((label, i) => (
              <div key={i}>
                <label className="text-xs font-bold text-[#00404f]/40 uppercase mb-1 block">
                  {label}
                </label>
                <input
                  type="text"
                  defaultValue={
                    i === 0
                      ? user?.name
                      : i === 1
                      ? user?.email
                      : "(11) 99999-9999"
                  }
                  className="w-full p-2 bg-[#F8FAFC] border border-[#00404f]/10 rounded-lg text-[#00404f] outline-none focus:border-[#3c88a0] transition-colors"
                />
              </div>
            ))}
            <Button variant="primary" className="w-full mt-2">
              Salvar Alterações
            </Button>
          </div>
        </Card>

        <Card>
          <h4 className="font-bold text-[#00404f] mb-4">Conquistas</h4>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl border ${
                  i <= 3
                    ? "bg-[#ffd166]/10 border-[#ffd166]/30"
                    : "bg-[#F8FAFC] border-[#00404f]/5 opacity-50 grayscale"
                }`}
              >
                {i === 1 ? "🏆" : i === 2 ? "🚀" : i === 3 ? "💰" : "🔒"}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
