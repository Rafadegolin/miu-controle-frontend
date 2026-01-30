import { apiClient } from "./api-client";
import type { ExchangeRate, ConversionResponse, ConsolidatedBalanceResponse } from "@/types/api";

// --- MOCK DATA ---
let mockRates: ExchangeRate[] = [
    { id: "rate_usd_brl", fromCurrency: "USD", toCurrency: "BRL", rate: 5.15, date: new Date().toISOString(), source: "API" },
    { id: "rate_eur_brl", fromCurrency: "EUR", toCurrency: "BRL", rate: 5.58, date: new Date().toISOString(), source: "API" },
    { id: "rate_gbp_brl", fromCurrency: "GBP", toCurrency: "BRL", rate: 6.55, date: new Date().toISOString(), source: "API" },
    { id: "rate_brl_usd", fromCurrency: "BRL", toCurrency: "USD", rate: 0.19, date: new Date().toISOString(), source: "API" },
];
// -----------------

export const exchangeRatesActions = {
  
  async getRates(): Promise<ExchangeRate[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockRates]), 500);
    });
  },

  async convertCurrency(amount: number, from: string, to: string): Promise<ConversionResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (from === to) {
                 resolve({
                    rate: 1,
                    convertedAmount: amount,
                    date: new Date().toISOString(),
                    from,
                    to
                 });
                 return;
            }

            // Try direct find
            let rateObj = mockRates.find(r => r.fromCurrency === from && r.toCurrency === to);
            
            // Try inverse if direct is not found (and simple inversion logic is acceptable for mock)
            if (!rateObj) {
                const inverseRate = mockRates.find(r => r.fromCurrency === to && r.toCurrency === from);
                if (inverseRate) {
                     // Invert rate
                     rateObj = {
                         id: `temp_inv_${inverseRate.id}`,
                         fromCurrency: from,
                         toCurrency: to,
                         rate: 1 / inverseRate.rate,
                         date: inverseRate.date,
                         source: inverseRate.source
                     };
                }
            }
            
            // Mock fallback if BRL involved (USD -> BRL base)
            if (!rateObj) {
                // If converting FROM BRL TO X, and we have X -> BRL
                const xToBrl = mockRates.find(r => r.fromCurrency === to && r.toCurrency === "BRL");
                 if (xToBrl) {
                     rateObj = {
                         id: "temp", fromCurrency: from, toCurrency: to, rate: 1 / xToBrl.rate, date: new Date().toISOString(), source: "API"
                     };
                 }
                // If converting FROM X TO BRL, and we don't have it, assume default
            }

            if (rateObj) {
                resolve({
                    rate: rateObj.rate,
                    convertedAmount: amount * rateObj.rate,
                    date: rateObj.date,
                    from,
                    to
                });
            } else {
                reject("Taxa de câmbio não encontrada para este par.");
            }
        }, 600);
    });
  },

  async createRate(from: string, to: string, rate: number): Promise<ExchangeRate> {
      return new Promise((resolve) => {
         const newRate: ExchangeRate = {
             id: `rate_${Date.now()}`,
             fromCurrency: from,
             toCurrency: to,
             rate: rate,
             date: new Date().toISOString(),
             source: "MANUAL"
         };
         // Replace existing if matches
         const existingIdx = mockRates.findIndex(r => r.fromCurrency === from && r.toCurrency === to);
         if (existingIdx !== -1) {
             mockRates[existingIdx] = newRate;
         } else {
             mockRates.push(newRate);
         }
         resolve(newRate);
      });
  },

  async getConsolidatedBalance(): Promise<ConsolidatedBalanceResponse> {
       // Mock implementation simulating multiple accounts
       return new Promise((resolve) => {
           setTimeout(() => {
               resolve({
                   totalBalance: 12500.50, // Mocked total in BRL
                   preferredCurrency: "BRL",
                   accounts: [
                       { accountId: "acc_1", originalBalance: 1500, originalCurrency: "USD", convertedBalance: 1500 * 5.15 },
                       { accountId: "acc_2", originalBalance: 2000, originalCurrency: "BRL", convertedBalance: 2000 },
                   ]
               });
           }, 700);
       });
  },
  
  async updateRatesFromApi(): Promise<{ message: string }> {
      return new Promise(resolve => setTimeout(() => resolve({ message: "Taxas atualizadas com sucesso via API externa." }), 1000));
  }
};
