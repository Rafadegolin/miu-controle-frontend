"use server";

import { Brand } from "@/types/api";

let mockBrands: Brand[] = [
  {
    id: "brand1",
    name: "Uber",
    slug: "uber",
    logoUrl: "https://logo.clearbit.com/uber.com",
    website: "uber.com",
    matchPatterns: ["uber", "uber*trip"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "brand2",
    name: "Netflix",
    slug: "netflix",
    logoUrl: "https://logo.clearbit.com/netflix.com",
    website: "netflix.com",
    matchPatterns: ["netflix.com", "netflix"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "brand3",
    name: "iFood",
    slug: "ifood",
    logoUrl: "https://logo.clearbit.com/ifood.com.br",
    website: "ifood.com.br",
    matchPatterns: ["ifood", "ifd*"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "brand4",
    name: "Amazon",
    slug: "amazon",
    logoUrl: "https://logo.clearbit.com/amazon.com.br",
    website: "amazon.com.br",
    matchPatterns: ["amazon", "amzn", "kindle"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "brand5",
    name: "Spotify",
    slug: "spotify",
    logoUrl: "https://logo.clearbit.com/spotify.com",
    website: "spotify.com",
    matchPatterns: ["spotify"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getBrands(): Promise<Brand[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockBrands]), 500);
  });
}

export async function createBrand(data: Partial<Brand>): Promise<Brand> {
  return new Promise((resolve) => {
    setTimeout(() => {
        const newBrand: Brand = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name || "Nova Marca",
            slug: data.slug || "nova-marca",
            logoUrl: data.logoUrl,
            website: data.website,
            matchPatterns: data.matchPatterns || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        mockBrands.push(newBrand);
        resolve(newBrand);
    }, 500);
  });
}

export async function deleteBrand(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
        mockBrands = mockBrands.filter(b => b.id !== id);
        resolve();
    }, 500);
  });
}

export async function checkBrandPattern(pattern: string, text: string): Promise<boolean> {
  // Simple mock matching
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(text.toLowerCase().includes(pattern.toLowerCase()));
      }, 300);
  });
}
