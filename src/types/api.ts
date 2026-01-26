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

export enum AiProvider {
  OPENAI = "OPENAI",
  GEMINI = "GEMINI",
}

export enum AiModel {
  GPT_4O = "gpt-4o",
  GPT_4O_MINI = "gpt-4o-mini",
  GEMINI_1_5_FLASH = "gemini-1.5-flash",
  GEMINI_1_5_PRO = "gemini-1.5-pro",
}

export interface AiConfig {
  configured: boolean;
  isAiEnabled: boolean;
  categorizationModel: string;
  analyticsModel: string;
  hasOpenAiKey: boolean;
  hasGeminiKey: boolean;
  monthlyTokenLimit?: number;
}

export interface UpdateAiConfigDto {
  isAiEnabled?: boolean;
  openaiApiKey?: string;
  geminiApiKey?: string;
  categorizationModel?: string;
  analyticsModel?: string;
}

export interface AiKeyTestDto {
  provider: AiProvider;
  apiKey: string;
}

export interface AiUsageFeatureStats {
  tokens: number;
  cost: number;
  requests: number;
}

export interface AiUsageStatsResponse {
  month: string;
  totalTokens: number;
  totalCost: number;
  totalCostBRL: number;
  byFeature: Record<string, AiUsageFeatureStats>;
}

export interface AiCategorizationStatsResponse {
  totalPredictions: number;
  averageConfidence: number;
  accuracy: number;
  correctionRate: number;
  message: string;
}



export interface ForecastResponse {
  available: boolean;
  forecast: {
    summary: string;
    healthScore: number;
    predictedExpense: number;
    predictedIncome: number;
    savingsGoal: number;
    insights: string[];
    recommendation: string;
  };
  trends: {
    predictedExpense: number;
    predictedIncome: number;
    expenseTrendSlope: number;
    incomeTrendSlope: number;
  };
}

export interface Anomaly {
  id: string;
  transactionId: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
  isDismissed: boolean;
  transaction: Transaction;
  detectedAt: string;
}

export interface FinancialHealthResponse {
  score: number;
  level: "DIAMANTE" | "PLATINA" | "OURO" | "PRATA" | "BRONZE";
  breakdown: {
    savingsRate: number;
    consistency: number;
    budgetHealth: number;
  };
  history: { date: string; score: number }[];
}

export interface GoalForecastResponse {
  goalId: string;
  status: "COMPLETED" | "ON_TRACK" | "STALLED";
  completionDate?: string;
  daysRemaining?: number;
  requiredMonthlyContribution?: number;
  message: string;
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

export enum RecommendationType {
  SPENDING_CUT = "SPENDING_CUT",
  BUDGET_ADJUST = "BUDGET_ADJUST",
  INVESTMENT = "INVESTMENT",
  DEBT_REDUCTION = "DEBT_REDUCTION",
  SAVING_OPPORTUNITY = "SAVING_OPPORTUNITY",
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
  hasCompletedOnboarding?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  initialBalance: number | string;
  currentBalance: number | string;
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
  userId: string;
  accountId: string;
  categoryId: string;
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
  
  // New fields
  isRecurring: boolean;
  recurrencePattern?: string;
  location?: string;
  notificationHash?: string;
  aiConfidence?: number;
  recurringTransactionId?: string;

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

export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  publishedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  userId: string;
  type: RecommendationType;
  title: string;
  description: string;
  impact: number;
  difficulty: number;
  priorityScore: number;
  status: "ACTIVE" | "APPLIED" | "DISMISSED";
  createdAt: string;
}

export interface ProjectionMonth {
  date: string; // YYYY-MM-DD (usually first of month)
  income: {
    fixed: number;
    variable: number;
    total: number;
  };
  expenses: {
    fixed: number;
    variable: number;
    total: number;
  };
  balance: {
    period: number;      // Result of income - expenses this month
    accumulated: number; // Rolling balance
  };
  scenarios: {
    optimistic: number;  // Accumulated balance in optimistic scenario
    pessimistic: number; // Accumulated balance in pessimistic scenario
  };
}

export interface ProactiveAlert {
  id: string;
  userId: string;
  type: "NEGATIVE_BALANCE" | "BILL_DUE";
  priority: "CRITICAL" | "WARNING" | "INFO";
  message: string;
  data?: any; // Extra context (e.g., date of negative balance)
  isDismissed: boolean;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  lastActiveAt: string;
  createdAt: string;
  isCurrent: boolean;
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
  categoryId: string; // Made required as per user payload
  type: TransactionType;
  amount: number;
  description: string;
  merchant?: string;
  date: string;
  tags?: string[];
  notes?: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
  source?: "MANUAL" | "NOTIFICATION" | "OPEN_BANKING" | "IMPORTED";
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
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

export interface CreateReleaseNoteDto {
  version: string;
  title: string;
  content: string;
  isActive?: boolean;
}

export interface CorrectCategoryDto {
  correctedCategoryId: string;
}

// === STATS ===

export interface CategoryStats {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  highestTransaction?: Transaction;
  monthlyTrend: Array<{
    month: string; // YYYY-MM
    amount: number;
  }>;
}

export interface TransactionStatsMonthly {
  period: string; // YYYY-MM-DD
  income: number;
  expenses: number;
  balance: number;
  transactionCount: number;
  categoryBreakdown: Array<{
    name: string;
    color: string;
    icon: string;
    total: number;
    count: number;
  }>;
  recentTransactions: Transaction[];
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

export interface AccountBalanceSummary {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string;
  icon: string;
}

export interface AccountSummaryResponse {
  totalBalance: number;
  accounts: AccountBalanceSummary[];
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

// === DASHBOARD SPECIFIC ===

export interface DashboardAccountSummary {
  totalBalance: number;
  activeAccountsCount: number;
  accounts: Account[];
}

export interface DashboardMonthStats {
  income: number;
  expense: number;
  balance: number;
  transactionCount: number;
  avgDailyExpense: number;
  comparisonWithLastMonth: {
    incomeChange: number;
    expenseChange: number;
    balanceChange: number;
  };
}

export interface DashboardGoalsState {
  active: Goal[];
  nearCompletion: Goal[];
  totalActiveGoals: number;
}

export interface DashboardBudgetState {
  items: Array<{
    id: string;
    categoryName: string;
    amount: number;
    spent: number;
    percentage: number;
    status: string;
    categoryColor: string;
    categoryIcon: string;
  }>;
  overBudget: any[];
  nearLimit: any[];
  totalBudgets: number;
}

export interface UpcomingRecurring {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  nextOccurrence: string;
  daysUntil: number;
  frequency: RecurringFrequency;
  accountName: string;
}

export interface ImportantDate {
  type: string;
  title: string;
  date: string;
  daysUntil: number;
  referenceId: string;
}

export interface DashboardInsight {
  type: "positive" | "negative" | "warning" | "info";
  title: string;
  message: string;
  icon: string;
}

// === REPORTS SPECIFIC ===

export interface ReportKPIs {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  incomeCount: number;
  expenseCount: number;
}

export interface ReportAverages {
  avgDailyIncome: number;
  avgDailyExpense: number;
  avgTransactionValue: number;
}

export interface ReportHighlights {
  highestIncome: {
    amount: number;
    description: string;
    date: string;
  };
  highestExpense: {
    amount: number;
    description: string;
    date: string;
  };
}

export interface ReportDashboardResponse {
  summary: ReportKPIs;
  averages: ReportAverages;
  highlights: ReportHighlights;
  period: {
    startDate: string;
    endDate: string;
    days: number;
  };
}

export interface CategoryAnalysisItem {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  count: number;
  totalIncome: number;
  totalExpense: number;
  total: number;
  percentage: number;
  transactions?: Transaction[];
}

export interface CategoryAnalysisResponse {
  categories: CategoryAnalysisItem[];
  totalCategories: number;
  grandTotal: number;
}

export interface MonthlyTrendItem {
  month: string;
  income: number;
  expense: number;
  balance: number;
  transactionCount: number;
}

export interface MonthlyTrendResponse {
  months: MonthlyTrendItem[];
  totalMonths: number;
}

export interface AccountAnalysisItem {
  accountId: string;
  accountName: string;
  accountColor: string;
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
  netFlow: number;
  count: number;
}

export interface AccountAnalysisResponse {
  accounts: AccountAnalysisItem[];
  totalAccounts: number;
}

export interface TopTransactionsResponse {
  topExpenses: Transaction[];
  topIncomes: Transaction[];
}

export interface FullReportResponse {
  dashboard: ReportDashboardResponse;
  categoryAnalysis: CategoryAnalysisResponse;
  monthlyTrend: MonthlyTrendResponse;
  accountAnalysis: AccountAnalysisResponse;
  topTransactions: TopTransactionsResponse;
  insights: DashboardInsight[];
  generatedAt: string;
}

export interface DashboardHomeResponse {
  accountsSummary: DashboardAccountSummary;
  currentMonth: DashboardMonthStats;
  goals: DashboardGoalsState;
  budgets: DashboardBudgetState;
  upcomingRecurring: UpcomingRecurring[];
  notifications: {
    unreadCount: number;
    recent: any[];
  };
  importantDates: ImportantDate[];
  insights: DashboardInsight[];
  generatedAt: string;
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
