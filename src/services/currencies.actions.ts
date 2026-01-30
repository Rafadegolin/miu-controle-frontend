"use server";

import { Currency } from "@/types/api";

// Mock Data Store
let mockCurrencies: Currency[] = [
  { code: "BRL", name: "Real Brasileiro", symbol: "R$", isActive: true, locale: "pt-BR" },
  { code: "USD", name: "Dólar Americano", symbol: "$", isActive: true, locale: "en-US" },
  { code: "EUR", name: "Euro", symbol: "€", isActive: true, locale: "de-DE" },
  { code: "JPY", name: "Iene Japonês", symbol: "¥", isActive: false, locale: "ja-JP" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", isActive: false, locale: "en-GB" },
];

export async function getCurrencies(activeOnly = true): Promise<Currency[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
        if (activeOnly) {
            resolve(mockCurrencies.filter(c => c.isActive));
        } else {
            resolve([...mockCurrencies]);
        }
    }, 500);
  });
}

export async function toggleCurrencyActive(code: string): Promise<Currency> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockCurrencies.findIndex(c => c.code === code);
            if (index !== -1) {
                mockCurrencies[index].isActive = !mockCurrencies[index].isActive;
                resolve(mockCurrencies[index]);
            } else {
                reject(new Error("Currency not found"));
            }
        }, 500);
    });
}

export async function createCurrency(data: { code: string; name: string; symbol: string; locale?: string }): Promise<Currency> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newCurrency: Currency = {
                ...data,
                isActive: true
            };
            mockCurrencies.push(newCurrency);
            resolve(newCurrency);
        }, 500);
    });
}
