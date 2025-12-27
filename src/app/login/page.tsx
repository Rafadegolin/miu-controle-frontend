"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.";
      setError(msg);
      toast.error(msg);
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
          <h2 className="text-2xl font-bold text-[#00404f]">
            Bem-vindo de volta!
          </h2>
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#00404f]/10 bg-[#F8FAFC] outline-none focus:border-[#3c88a0] transition-colors pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00404f]/40 hover:text-[#00404f] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-[#00404f]/60 hover:text-[#00404f] transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-2"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#00404f]/60 mt-6">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="font-bold text-[#00404f] hover:underline"
          >
            Criar grátis
          </Link>
        </p>
      </Card>
    </div>
  );
}
