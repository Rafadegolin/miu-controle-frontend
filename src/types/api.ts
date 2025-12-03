// ============================================
// TIPOS DO BACKEND - API MIU CONTROLE
// ============================================

// === ENUMS ===
export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  CREDIT_CARD = "CREDIT_CARD",
  INVESTMENT = "INVESTMENT",
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum CategoryType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
}

export enum GoalStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
}

export enum BudgetPeriod {
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY",
}

export enum RecurringFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum SubscriptionTier {
  FREE = "FREE",
  PRO = "PRO",
  FAMILY = "FAMILY",
}

// === ENTIDADES ===

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  subscriptionTier: SubscriptionTier;
  emailVerified: boolean;
  preferredCurrency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currentBalance: number;
  currency: string;
  color: string;
  icon?: string;
  bankCode?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  parentId?: string;
  color: string;
  icon?: string;
  isSystem: boolean;
  budgetAllocated?: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  merchant?: string;
  date: string;
  tags: string[];
  notes?: string;
  receiptUrl?: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  source: "MANUAL" | "NOTIFICATION" | "OPEN_BANKING" | "IMPORTED";
  createdAt: string;
  updatedAt: string;
  account?: Account;
  category?: Category;
}

export interface PurchaseLink {
  id: string;
  title: string;
  url: string;
  price?: number;
  currency?: string;
  note?: string;
  addedAt: string;
  updatedAt?: string;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  color: string;
  icon?: string;
  priority: number;
  status: GoalStatus;

  // Campos de imagem
  imageUrl?: string;
  imageKey?: string;
  imageMimeType?: string;
  imageSize?: number;

  // Links de compra
  purchaseLinks?: PurchaseLink[];

  // Campos calculados
  percentage?: number;
  remaining?: number;
  isOverdue?: boolean;
  daysRemaining?: number;

  createdAt: string;
  updatedAt: string;
  completedAt?: string;

  contributions?: GoalContribution[];
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amount: number;
  transactionId?: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  period: BudgetPeriod;
  startDate: string;
  endDate?: string;
  alertPercentage: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface RecurringTransaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  frequency: RecurringFrequency;
  interval: number;
  dayOfMonth?: number;
  dayOfWeek?: number;
  startDate: string;
  endDate?: string;
  lastProcessedDate?: string;
  autoCreate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// === DTOs (Request Bodies) ===

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateAccountDto {
  name: string;
  type: AccountType;
  initialBalance: number;
  currency?: string;
  color?: string;
  icon?: string;
  bankCode?: string;
}

export interface CreateCategoryDto {
  name: string;
  type: CategoryType;
  parentId?: string;
  color?: string;
  icon?: string;
  budgetAllocated?: number;
}

export interface CreateTransactionDto {
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  merchant?: string;
  date: string;
  tags?: string[];
  notes?: string;
}

export interface CreateGoalDto {
  name: string;
  description?: string;
  targetAmount: number;
  targetDate?: string;
  color?: string;
  icon?: string;
  priority?: number;
}

export interface AddPurchaseLinkDto {
  title: string;
  url: string;
  price?: number;
  currency?: string;
  note?: string;
}

export interface ContributeGoalDto {
  amount: number;
  transactionId?: string;
  date?: string;
}

export interface CreateBudgetDto {
  categoryId: string;
  amount: number;
  period: BudgetPeriod;
  startDate: string;
  endDate?: string;
  alertPercentage?: number;
}

export interface CreateRecurringTransactionDto {
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  frequency: RecurringFrequency;
  interval?: number;
  dayOfMonth?: number;
  dayOfWeek?: number;
  startDate: string;
  endDate?: string;
  autoCreate?: boolean;
}

// === RESPONSES ===

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AccountSummaryResponse {
  total: number;
  totalBalance: number;
  byType: Record<AccountType, number>;
  accounts: Account[];
}

export interface TransactionSummaryResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
  }>;
  byAccount: Array<{
    accountId: string;
    accountName: string;
    total: number;
  }>;
}

export interface BudgetStatusResponse {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
  isOverBudget: boolean;
}

export interface GoalSummaryResponse {
  total: number;
  active: number;
  completed: number;
  cancelled: number;
  totalTargeted: number;
  totalSaved: number;
  overallPercentage: number;
  goals: Goal[];
}

export interface PurchaseLinksSummaryResponse {
  total: number;
  totalBRL: number;
  byCurrency: Record<string, number>;
  links: PurchaseLink[];
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

// === QUERY PARAMS ===

export interface TransactionFilters {
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface AccountFilters {
  isActive?: boolean;
}

export interface CategoryFilters {
  type?: CategoryType;
}

export interface GoalFilters {
  status?: GoalStatus;
}

export interface BudgetFilters {
  period?: BudgetPeriod;
}
