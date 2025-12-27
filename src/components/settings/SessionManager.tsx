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
      <Card className="p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-100 rounded"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00404f]/5 rounded-lg text-[#00404f]">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-[#00404f]">Sessões Ativas</h3>
          <p className="text-sm text-[#00404f]/60">
            Gerencie os dispositivos conectados à sua conta.
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="space-y-4">
        {sessions.map((session) => {
          const isMobile = /mobile/i.test(session.userAgent);
          
          return (
            <div
              key={session.id}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                session.isCurrent
                  ? "bg-[#007459]/5 border-[#007459]/20"
                  : "bg-white border-[#00404f]/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    session.isCurrent
                      ? "bg-[#007459]/10 text-[#007459]"
                      : "bg-[#00404f]/5 text-[#00404f]"
                  }`}
                >
                  {isMobile ? <Smartphone size={20} /> : <Laptop size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#00404f] text-sm">
                      {isMobile ? "Dispositivo Móvel" : "Computador"}
                    </p>
                    {session.isCurrent && (
                      <span className="text-[10px] font-bold bg-[#007459] text-white px-2 py-0.5 rounded-full">
                        ATUAL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#00404f]/60">
                    <span title={session.userAgent} className="truncate max-w-[150px]">
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
                  size="sm" // Use size="sm" if available, or just verify props later
                  onClick={() => handleRevoke(session.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  title="Revogar acesso"
                >
                  <LogOut size={16} />
                </Button>
              )}
            </div>
          );
        })}

        {sessions.length === 0 && (
          <p className="text-center text-[#00404f]/40 py-4">
            Nenhuma sessão encontrada.
          </p>
        )}
      </div>

      {sessions.length > 1 && (
        <div className="mt-6 pt-6 border-t border-[#00404f]/10 flex justify-end">
          <Button
            variant="outline"
            onClick={handleRevokeAll}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-2" />
            Sair de todos os outros dispositivos
          </Button>
        </div>
      )}
    </Card>
  );
}
