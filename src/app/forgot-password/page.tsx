"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsSubmitting(true);
    setError("");
    try {
      await api.forgotPassword(data.email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ocorreu um erro ao enviar o email. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
        </Link>
        
        <h2 className={styles.title}>Recuperar Senha</h2>
        <p className={styles.subtitle}>
          Informe seu email para receber o link de redefinição
        </p>

        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 mb-4 border border-green-500/20">
              <svg
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className={styles.title} style={{ fontSize: '1.2rem' }}>Email Enviado!</h3>
            <p className={styles.subtitle}>
              Verifique sua caixa de entrada e siga as instruções para redefinir
              sua senha.
            </p>
            <Link href="/login">
              <button className={`${styles.submitBtn} ${styles.btnOutline}`} style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white'}}>
                Voltar para Login
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className={`${styles.message} ${styles.error}`}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={styles.input}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span className={styles.requirements} style={{ color: '#fca5a5', display: 'block', marginTop: '5px' }}>
                  {errors.email.message}
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
                  <Loader2 className="animate-spin h-4 w-4" /> Enviando...
                </span>
              ) : (
                "Enviar Link"
              )}
            </button>
          </form>
        )}

        {!isSuccess && (
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className={styles.forgotPass}
              style={{ textAlign: 'center', float: 'none' }}
            >
              Voltar para o Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
