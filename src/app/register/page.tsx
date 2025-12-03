"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({ email, password, fullName: name });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white!">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#00404f] rounded-xl flex items-center justify-center text-[#7cddb1] font-bold text-2xl mx-auto mb-4 shadow-lg">
            M
          </div>
          <h2 className="text-2xl font-bold text-[#00404f]">Crie sua conta</h2>
          <p className="text-[#00404f]/60 text-sm mt-1">
            Controle suas finanças de forma inteligente.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-2"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Começar Agora"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#00404f]/60 mt-6">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-bold text-[#00404f] hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </Card>
    </div>
  );
}
