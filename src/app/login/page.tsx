"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import styles from "@/components/auth/Auth.module.css";

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
      const user = await login({ email, password });
      toast.success("Bem-vindo de volta!");
      
      if (user.hasCompletedOnboarding === false) {
          router.push("/onboarding");
      } else {
          router.push("/dashboard");
      }
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
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
        </Link>
        
        <h2 className={styles.title}>Bem-vindo de volta!</h2>
        <p className={styles.subtitle}>
          Controle suas finanças de forma inteligente.
        </p>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            <Link
              href="/forgot-password"
              className={styles.forgotPass}
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.signupLink}>
          Não tem conta?
          <Link href="/register">
            Criar grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
