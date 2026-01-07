"use client";

import { useState, useEffect } from "react"; // Added useEffect and useState
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Laptop, Smartphone, Trash2, Shield, LogOut, Clock, Globe } from "lucide-react";
import api from "@/services/api";
import { Session } from "@/types/api";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function SessionManager() {
  const [sessions, setSessions] = useState<Session[]>([]); // Typed state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const data = await api.getSessions();
      setSessions(data);
    } catch (err) {
      setError("Erro ao carregar sessões.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []); // Added dependency array

  const handleRevoke = async (id: string) => {
    try {
      await api.revokeSession(id);
      setSessions(sessions.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao revogar sessão:", err);
      // Optional: Show error toast/message
    }
  };

  const handleRevokeAll = async () => {
    if (!confirm("Tem certeza que deseja desconectar de todos os outros dispositivos?")) return;
    
    try {
      await api.revokeAllSessions();
      // Keep only current session locally or re-fetch
      // Ideally, the backend would invalidate others.
      // We can filter out non-current sessions or re-fetch.
      fetchSessions();
    } catch (err) {
      console.error("Erro ao revogar todas as sessões:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-[#06181b] border border-white/10 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-lg mb-6"></div>
        <div className="space-y-3">
          <div className="h-20 bg-white/5 rounded-xl"></div>
          <div className="h-20 bg-white/5 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-[#06181b] border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-[#32d6a5]/10 rounded-xl text-[#32d6a5]">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Sessões Ativas</h3>
          <p className="text-sm text-gray-400">
            Gerencie os dispositivos conectados à sua conta.
          </p>
        </div>
      </div>

      {error && <p className="text-red-400 mb-4 text-sm font-medium">{error}</p>}

      <div className="space-y-3">
        {sessions.map((session) => {
          const isMobile = /mobile/i.test(session.userAgent);
          
          return (
            <div
              key={session.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                session.isCurrent
                  ? "bg-[#32d6a5]/5 border-[#32d6a5]/20 shadow-[0_0_15px_rgba(50,214,165,0.05)]"
                  : "bg-[#020809] border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    session.isCurrent
                      ? "bg-[#32d6a5]/10 text-[#32d6a5]"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {isMobile ? <Smartphone size={20} /> : <Laptop size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-white text-sm">
                      {isMobile ? "Dispositivo Móvel" : "Computador"}
                    </p>
                    {session.isCurrent && (
                      <span className="text-[10px] font-bold bg-[#32d6a5] text-[#020809] px-2 py-0.5 rounded-full">
                        ATUAL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span title={session.userAgent} className="truncate max-w-[150px] md:max-w-[250px]">
                      {session.ipAddress}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {session.lastActiveAt && !isNaN(new Date(session.lastActiveAt).getTime())
                        ? formatDistanceToNow(new Date(session.lastActiveAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        : "Data desconhecida"}
                    </span>
                  </div>
                </div>
              </div>

              {!session.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRevoke(session.id)}
                  className="text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Revogar acesso"
                >
                  <LogOut size={18} />
                </Button>
              )}
            </div>
          );
        })}

        {sessions.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhuma sessão encontrada.
          </p>
        )}
      </div>

      {sessions.length > 1 && (
        <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
          <Button
            variant="outline"
            onClick={handleRevokeAll}
            className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400 bg-transparent transition-all"
          >
            <Trash2 size={16} className="mr-2" />
            Sair de todos os outros dispositivos
          </Button>
        </div>
      )}
    </div>
  );
}
