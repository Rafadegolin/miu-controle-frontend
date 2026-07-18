import { AxiosError } from "axios";

interface ApiErrorBody {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  retryAfter?: string;
}

/**
 * Normaliza o corpo de erro do backend (padrão NestJS, sem envelope) numa string
 * amigável. A validação global estrita retorna `message` como ARRAY (um item por
 * campo); 401/403/404 retornam `message` string. Ver docs/handoff/README.md.
 */
export function extractApiError(
  error: unknown,
  fallback = "Algo deu errado. Tente novamente."
): string {
  const body = getErrorBody(error);
  if (body) {
    if (Array.isArray(body.message)) return body.message.join(" · ");
    if (typeof body.message === "string" && body.message) return body.message;
    if (typeof body.error === "string" && body.error) return body.error;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/**
 * Quando o backend retorna 400 de validação (`message` array), devolve a lista de
 * mensagens por campo. Vazio caso não seja um erro de validação.
 */
export function extractFieldErrors(error: unknown): string[] {
  const body = getErrorBody(error);
  if (body && Array.isArray(body.message)) return body.message;
  return [];
}

function getErrorBody(error: unknown): ApiErrorBody | null {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    return (error as AxiosError<ApiErrorBody>).response?.data ?? null;
  }
  return null;
}
