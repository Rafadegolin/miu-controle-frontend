"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import styles from "@/components/auth/Auth.module.css";

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
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
        </Link>
        
        <h2 className={styles.title}>Crie sua conta</h2>
        <p className={styles.subtitle}>
          Comece a controlar sua vida financeira.
        </p>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>NOME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>SENHA</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordRequirements(true)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.inputIconBtn}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Requisitos de senha */}
            {showPasswordRequirements && (
              <div className={styles.requirements}>
                <span className={styles.reqTitle}>Sua senha deve ter:</span>
                <div className={`${styles.reqItem} ${passwordValidation.minLength ? styles.reqMet : ''}`}>
                  <span>{passwordValidation.minLength ? '✓' : '○'}</span>
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`${styles.reqItem} ${passwordValidation.hasUpper ? styles.reqMet : ''}`}>
                  <span>{passwordValidation.hasUpper ? '✓' : '○'}</span>
                  <span>Letra maiúscula</span>
                </div>
                <div className={`${styles.reqItem} ${passwordValidation.hasNumber ? styles.reqMet : ''}`}>
                  <span>{passwordValidation.hasNumber ? '✓' : '○'}</span>
                  <span>Número</span>
                </div>
                <div className={`${styles.reqItem} ${passwordValidation.hasSymbol ? styles.reqMet : ''}`}>
                  <span>{passwordValidation.hasSymbol ? '✓' : '○'}</span>
                  <span>Símbolo (@$!%*?&)</span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Começar Agora"}
          </button>
        </form>

        <p className={styles.signupLink}>
          Já tem conta?
          <Link href="/login">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
