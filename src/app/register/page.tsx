"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { toast } from "sonner";

// Validação de senha forte
const validatePassword = (pwd: string) => {
  return {
    minLength: pwd.length >= 8,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /\d/.test(pwd),
    hasSymbol: /[@$!%*?&]/.test(pwd),
  };
};

const isPasswordValid = (pwd: string) => {
  const validation = validatePassword(pwd);
  return Object.values(validation).every(Boolean);
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar senha antes de enviar
    if (!isPasswordValid(password)) {
      const msg = "A senha não atende aos requisitos de segurança.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
      setShowPasswordRequirements(true);
      return;
    }

    try {
      await register({ email, password, fullName: name });
      toast.success("Conta criada com sucesso! Bem-vindo!");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Register error:", err);
      const errorMessage = err.response?.data?.message;
      
      let finalMsg = errorMessage || "Erro ao criar conta. Tente novamente.";

      // Tratamento específico de erros
      if (Array.isArray(errorMessage)) {
        finalMsg = errorMessage.join(", ");
      } else if (err.response?.status === 409) {
        finalMsg = "Este email já está cadastrado.";
      }
      
      setError(finalMsg);
      toast.error(finalMsg);
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordRequirements(true)}
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
            
            {/* Requisitos de senha */}
            {showPasswordRequirements && (
              <div className="mt-2 p-3 rounded-lg bg-[#F8FAFC] border border-[#00404f]/10 text-xs space-y-1">
                <p className="font-bold text-[#00404f]/80 mb-2">A senha deve conter:</p>
                <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-[#007459]' : 'text-[#00404f]/40'}`}>
                  <span>{passwordValidation.minLength ? '✓' : '○'}</span>
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasUpper ? 'text-[#007459]' : 'text-[#00404f]/40'}`}>
                  <span>{passwordValidation.hasUpper ? '✓' : '○'}</span>
                  <span>Letra maiúscula (A-Z)</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasLower ? 'text-[#007459]' : 'text-[#00404f]/40'}`}>
                  <span>{passwordValidation.hasLower ? '✓' : '○'}</span>
                  <span>Letra minúscula (a-z)</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-[#007459]' : 'text-[#00404f]/40'}`}>
                  <span>{passwordValidation.hasNumber ? '✓' : '○'}</span>
                  <span>Número (0-9)</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasSymbol ? 'text-[#007459]' : 'text-[#00404f]/40'}`}>
                  <span>{passwordValidation.hasSymbol ? '✓' : '○'}</span>
                  <span>Símbolo (@$!%*?&)</span>
                </div>
              </div>
            )}
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
