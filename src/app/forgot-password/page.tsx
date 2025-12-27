"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
          Recuperar Senha
        </h2>
        <p className="mt-2 text-center text-sm text-[#3c88a0]">
          Informe seu email para receber o link de redefinição
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
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
              <h3 className="text-lg font-medium text-[#00404f] mb-2">
                Email Enviado!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Verifique sua caixa de entrada e siga as instruções para redefinir
                sua senha.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Voltar para Login
                </Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#00404f]"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00bafa] focus:border-[#00bafa] sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
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
                      Enviando...
                    </>
                  ) : (
                    "Enviar Link"
                  )}
                </Button>
              </div>
            </form>
          )}

          {!isSuccess && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Lembrou sua senha?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="font-medium text-[#00bafa] hover:text-[#009ac9]"
                >
                  Voltar para o Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
