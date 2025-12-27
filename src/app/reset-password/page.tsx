"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

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
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-[#00404f] mb-2">Link Inválido</h3>
        <p className="text-sm text-gray-500 mb-6">
          O link de redefinição de senha é inválido ou está faltando.
        </p>
        <Link href="/forgot-password">
          <Button variant="outline">Solicitar novo link</Button>
        </Link>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#00404f] mb-4" />
        <p className="text-[#3c88a0]">Verificando link...</p>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-[#00404f] mb-2">Link Expirado</h3>
        <p className="text-sm text-gray-500 mb-6">
          Este link de redefinição de senha expirou ou é inválido.
        </p>
        <Link href="/forgot-password">
          <Button variant="primary">Solicitar novo link</Button>
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-[#00404f] mb-2">
          Senha Redefinida!
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Sua senha foi alterada com sucesso. Você será redirecionado para o login
          em instantes.
        </p>
        <Link href="/login">
          <Button variant="primary" className="w-full">
            Ir para Login agora
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
         <div className="flex justify-center">
             <Image
                src="/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00404f]">
          Redefinir Senha
        </h2>
        <p className="mt-2 text-center text-sm text-[#3c88a0]">
          Crie uma nova senha segura para sua conta
        </p>
      </div>

      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#00404f]"
            >
              Nova Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00bafa] focus:border-[#00bafa] sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#00404f]"
            >
              Confirmar Nova Senha
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00bafa] focus:border-[#00bafa] sm:text-sm`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Redefinindo...
                </>
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin mx-auto text-[#00404f]" />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
