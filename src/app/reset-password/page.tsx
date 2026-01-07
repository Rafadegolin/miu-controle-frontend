"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/services/api";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/[\W_]/, "Deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      return;
    }

    const verifyToken = async () => {
      try {
        await api.verifyResetToken(token);
        setIsValidToken(true);
      } catch (err) {
        setIsValidToken(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return;

    setIsSubmitting(true);
    setError("");
    try {
      await api.resetPassword(token, data.password);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ocorreu um erro ao redefinir a senha. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h3 className={styles.title}>Link Inválido</h3>
          <p className={styles.subtitle}>
            O link de redefinição de senha é inválido ou está faltando.
          </p>
          <Link href="/forgot-password">
            <button className={styles.submitBtn}>Solicitar novo link</button>
          </Link>
        </div>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: "center" }}>
          <Loader2 className="w-8 h-8 animate-spin text-white mb-4 mx-auto" />
          <p className={styles.subtitle}>Verificando link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h3 className={styles.title}>Link Expirado</h3>
          <p className={styles.subtitle}>
            Este link de redefinição de senha expirou ou é inválido.
          </p>
          <Link href="/forgot-password">
            <button className={styles.submitBtn}>Solicitar novo link</button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className={styles.title}>Senha Redefinida!</h3>
          <p className={styles.subtitle}>
            Sua senha foi alterada com sucesso. Você será redirecionado para o login em instantes.
          </p>
          <Link href="/login">
            <button className={styles.submitBtn}>Ir para Login agora</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
        </Link>
        
        <h2 className={styles.title}>Redefinir Senha</h2>
        <p className={styles.subtitle}>
          Crie uma nova senha segura para sua conta
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              NOVA SENHA
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={styles.input}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className={styles.requirements} style={{ color: '#fca5a5', display: 'block', marginTop: '5px' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              CONFIRMAR NOVA SENHA
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={styles.input}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className={styles.requirements} style={{ color: '#fca5a5', display: 'block', marginTop: '5px' }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> Redefinindo...
              </span>
            ) : (
              "Redefinir Senha"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020809] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#32d6a5]" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
