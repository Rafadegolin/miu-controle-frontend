// Design Tokens
export const COLORS = {
  primary: "#00404f",
  secondary: "#3c88a0",
  accent: "#7cddb1",
  success: "#007459",
  white: "#ffffff",
  bgLight: "#F8FAFC",
  expense: "#ff6b6b",
  warning: "#ffd166",
} as const;

// Mock Data
export const MOCK_USER = {
  name: "Rafael",
  email: "rafael@miu.app",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael",
  level: 4,
  xp: 3250,
  streak: 15,
  balance: { available: 1247.0, budget: 5200.0, used: 3953.0 },
};

export const MOCK_TRANSACTIONS = [
  {
    id: 1,
    desc: "Almoço Restaurante",
    cat: "Alimentação",
    date: "Hoje, 12:30",
    amount: -45.0,
    type: "expense" as const,
    method: "Nubank",
  },
  {
    id: 2,
    desc: "Salário Mensal",
    cat: "Receita",
    date: "Ontem, 09:00",
    amount: 5200.0,
    type: "income" as const,
    method: "Itaú",
  },
  {
    id: 3,
    desc: "Uber para casa",
    cat: "Transporte",
    date: "Ontem, 18:20",
    amount: -24.9,
    type: "expense" as const,
    method: "Crédito",
  },
  {
    id: 4,
    desc: "Supermercado",
    cat: "Alimentação",
    date: "28 Nov",
    amount: -180.0,
    type: "expense" as const,
    method: "Débito",
  },
  {
    id: 5,
    desc: "Netflix",
    cat: "Lazer",
    date: "28 Nov",
    amount: -50.0,
    type: "expense" as const,
    method: "Nubank",
    recurring: true,
  },
];

export const MOCK_ACCOUNTS = [
  {
    id: 1,
    name: "Nubank",
    type: "Corrente",
    balance: 1247.0,
    color: "#820AD1",
  },
  {
    id: 2,
    name: "Inter",
    type: "Investimento",
    balance: 15450.0,
    color: "#FF7A00",
  },
  { id: 3, name: "XP", type: "Ações", balance: 32150.0, color: "#000000" },
];

export const MOCK_INVESTMENTS = [
  {
    id: 1,
    name: "Tesouro Selic 2027",
    type: "Renda Fixa",
    value: 12500,
    return: "+12.5%",
    color: COLORS.success,
  },
  {
    id: 2,
    name: "IVVB11",
    type: "ETF",
    value: 8400,
    return: "+4.2%",
    color: COLORS.primary,
  },
  {
    id: 3,
    name: "Bitcoin",
    type: "Cripto",
    value: 4200,
    return: "-2.1%",
    color: "#F7931A",
  },
];

export const MOCK_GOALS = [
  {
    id: 1,
    name: "Viagem Europa",
    current: 12500,
    target: 25000,
    icon: "✈️",
    deadline: "Dez 2026",
  },
  {
    id: 2,
    name: "Macbook Pro",
    current: 8000,
    target: 12000,
    icon: "💻",
    deadline: "Jul 2025",
  },
];

export const REPORT_DATA = [
  { name: "Jan", receita: 4000, despesa: 2400 },
  { name: "Fev", receita: 3000, despesa: 1398 },
  { name: "Mar", receita: 5000, despesa: 3800 },
  { name: "Abr", receita: 2780, despesa: 3908 },
  { name: "Mai", receita: 4890, despesa: 2800 },
  { name: "Jun", receita: 6390, despesa: 3800 },
];

export const CATEGORY_DATA = [
  { name: "Alimentação", value: 35, color: COLORS.expense },
  { name: "Transporte", value: 25, color: COLORS.secondary },
  { name: "Lazer", value: 20, color: COLORS.warning },
  { name: "Moradia", value: 15, color: COLORS.accent },
  { name: "Outros", value: 5, color: "#a0c4ff" },
];
