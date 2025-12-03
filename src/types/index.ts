export interface User {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  balance: {
    available: number;
    budget: number;
    used: number;
  };
}

export interface Transaction {
  id: number;
  desc: string;
  cat: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  method: string;
  recurring?: boolean;
}

export interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  color: string;
}

export interface Investment {
  id: number;
  name: string;
  type: string;
  value: number;
  return: string;
  color: string;
}

export interface Goal {
  id: number;
  name: string;
  current: number;
  target: number;
  icon: string;
  deadline: string;
}

export interface ChartData {
  name: string;
  receita?: number;
  despesa?: number;
  value?: number;
  color?: string;
}
