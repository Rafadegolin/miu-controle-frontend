"use server";

import { User, SubscriptionTier } from "@/types/api";

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  transactionVolume: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  keys: number;
  memoryUsage: string;
}

export interface SlowQuery {
  id: string;
  query: string;
  duration: number;
  timestamp: string;
}

// Mock Data
let mockUsers: User[] = [
  { id: "1", email: "user1@example.com", fullName: "Alice Silva", subscriptionTier: SubscriptionTier.PRO, emailVerified: true, preferredCurrency: "BRL", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: "2", email: "user2@example.com", fullName: "Bob Santos", subscriptionTier: SubscriptionTier.FREE, emailVerified: true, preferredCurrency: "BRL", createdAt: "2024-02-20T14:30:00Z", updatedAt: "2024-02-20T14:30:00Z" },
  { id: "3", email: "charlie@example.com", fullName: "Charlie Oliveira", subscriptionTier: SubscriptionTier.FAMILY, emailVerified: false, preferredCurrency: "USD", createdAt: "2024-03-05T09:15:00Z", updatedAt: "2024-03-05T09:15:00Z" },
];

export async function getAdminStats(): Promise<AdminStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1250,
        activeUsers: 843,
        activeSubscriptions: 420,
        totalRevenue: 15400.00,
        transactionVolume: 450020.50,
      });
    }, 600);
  });
}

export async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]);
    }, 500);
  });
}

export async function banUser(userId: string): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`User ${userId} banned`);
            resolve();
        }, 500);
    });
}

export async function getCacheStats(): Promise<CacheStats> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                hits: 15420,
                misses: 230,
                keys: 450,
                memoryUsage: "24.5 MB"
            });
        }, 400);
    });
}

export async function getSlowQueries(): Promise<SlowQuery[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "1", query: "SELECT * FROM transactions WHERE user_id = '...' AND date > '2023-01-01'", duration: 2500, timestamp: new Date().toISOString() },
                { id: "2", query: "SELECT count(*) FROM users", duration: 800, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
            ]);
        }, 400);
    });
}
