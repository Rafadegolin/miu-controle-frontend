import { apiClient } from "./api-client";
import { Brand } from "@/types/api";

export async function getBrands(): Promise<Brand[]> {
  const res = await apiClient.get<Brand[]>("/brands");
  return res.data;
}

// Nota: no backend atual, as mutações de marca exigem ADMIN mas o controller
// não popula req.user (sem JwtAuthGuard) → retornam 403 até o backend corrigir.
export async function createBrand(data: Partial<Brand>): Promise<Brand> {
  const res = await apiClient.post<Brand>("/brands", {
    name: data.name,
    slug: data.slug,
    matchPatterns: data.matchPatterns ?? [],
    website: data.website,
    logoUrl: data.logoUrl,
  });
  return res.data;
}

export async function deleteBrand(id: string): Promise<void> {
  await apiClient.delete(`/brands/${id}`);
}

export async function checkBrandPattern(
  pattern: string,
  text: string,
): Promise<boolean> {
  const res = await apiClient.post<{ match: boolean }>("/brands/check-pattern", {
    pattern,
    text,
  });
  return res.data.match;
}
