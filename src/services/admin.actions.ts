import { apiClient } from "./api-client";
import { User } from "@/types/api";

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

interface AdminStatsApi {
  users: { total: number; active: number };
  subscriptions: { active: number };
  system: { transactions: number; health: string };
}

interface CacheStatsApi {
  hits: number;
  misses: number;
  total: number;
  hitRate: number;
  timestamp: string;
}

interface SlowQueryApi {
  query: string;
  params: string;
  duration: number;
  timestamp: string;
}

interface AdminUserApi {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  emailVerified?: boolean;
  preferredCurrency?: string;
  subscriptionTier?: User["subscriptionTier"];
  subscription?: { tier?: User["subscriptionTier"] } | null;
  createdAt: string;
  updatedAt?: string;
}

export async function getAdminStats(): Promise<AdminStats> {
  const res = await apiClient.get<AdminStatsApi>("/admin/dashboard/stats");
  const d = res.data;
  return {
    totalUsers: d.users.total,
    activeUsers: d.users.active,
    activeSubscriptions: d.subscriptions.active,
    totalRevenue: 0, // não rastreado no backend
    transactionVolume: d.system.transactions,
  };
}

export async function getUsers(): Promise<User[]> {
  const res = await apiClient.get<{ data: AdminUserApi[] }>(
    "/users/admin/list",
    { params: { limit: 100 } },
  );
  return res.data.data.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    avatarUrl: u.avatarUrl ?? undefined,
    subscriptionTier: u.subscription?.tier ?? u.subscriptionTier ?? ("FREE" as User["subscriptionTier"]),
    emailVerified: u.emailVerified ?? false,
    preferredCurrency: u.preferredCurrency ?? "BRL",
    createdAt: u.createdAt,
    updatedAt: u.updatedAt ?? u.createdAt,
  }));
}

export async function banUser(userId: string): Promise<void> {
  await apiClient.patch(`/users/admin/${userId}/ban`, { isActive: false });
}

export async function getCacheStats(): Promise<CacheStats> {
  const res = await apiClient.get<CacheStatsApi>("/admin/cache-stats");
  const d = res.data;
  return {
    hits: d.hits,
    misses: d.misses,
    keys: d.total,
    memoryUsage: `${d.hitRate.toFixed(1)}% hit`,
  };
}

export async function getSlowQueries(): Promise<SlowQuery[]> {
  const res = await apiClient.get<SlowQueryApi[]>("/admin/slow-queries");
  return res.data.map((q, i) => ({
    id: String(i),
    query: q.query,
    duration: q.duration,
    timestamp: q.timestamp,
  }));
}
