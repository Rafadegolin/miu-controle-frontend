"use server";

import { EmergencyFund, EmergencyFundWithdrawal } from "@/types/api";

const mockFund: EmergencyFund = {
  id: "fund_01",
  userId: "user_01",
  currentAmount: 15400,
  targetAmount: 30000, // 5k expenses * 6 months
  monthsCovered: 3.1,
  status: "SECURE", // > 3 months
  monthlyExpensesAverage: 5000,
  isSetup: true,
  lastUpdated: new Date().toISOString()
};

const mockWithdrawals: EmergencyFundWithdrawal[] = [
    {
        id: "w1",
        amount: 2000,
        reason: "Conserto do Carro",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        userId: "user_01"
    }
];

export async function getEmergencyFundStatus(): Promise<EmergencyFund> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...mockFund });
        }, 800);
    });
}

export async function setupEmergencyFund(): Promise<EmergencyFund> {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockFund.isSetup = true;
            resolve({ ...mockFund });
        }, 1000);
    });
}

export async function contributeToFund(amount: number): Promise<void> {
     return new Promise((resolve) => {
        setTimeout(() => {
            mockFund.currentAmount += amount;
            mockFund.monthsCovered = mockFund.currentAmount / mockFund.monthlyExpensesAverage;
            // Update status
            if (mockFund.monthsCovered >= 3) mockFund.status = "SECURE";
            else if (mockFund.monthsCovered >= 1) mockFund.status = "WARNING";
            else mockFund.status = "CRITICAL";
            
            resolve();
        }, 800);
    });
}

export async function withdrawFromFund(amount: number, reason: string): Promise<void> {
    return new Promise((resolve) => {
         setTimeout(() => {
             mockFund.currentAmount -= amount;
             mockFund.monthsCovered = mockFund.currentAmount / mockFund.monthlyExpensesAverage;
             
             // Update status logic
             if (mockFund.monthsCovered >= 3) mockFund.status = "SECURE";
             else if (mockFund.monthsCovered >= 1) mockFund.status = "WARNING";
             else mockFund.status = "CRITICAL";

             mockWithdrawals.push({
                 id: `w_${Date.now()}`,
                 amount,
                 reason,
                 date: new Date().toISOString(),
                 userId: "user_01"
             });

             resolve();
         }, 800);
     });
}

export async function getFundHistory(): Promise<EmergencyFundWithdrawal[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockWithdrawals]);
        }, 500);
    });
}
