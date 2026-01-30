"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Target,
  TrendingDown,
  TrendingUp,
  Link as LinkIcon,
  User,
  Settings,
  Sparkles,
  LogOut,

  X,
  HeartPulse,
  PiggyBank,
  Repeat,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { getFullImageUrl } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: "overview",
    icon: LayoutDashboard,
    label: "Visão Geral",
    href: "/dashboard",
  },
  {
    id: "transactions",
    icon: Wallet,
    label: "Transações",
    href: "/dashboard/transactions",
  },
  {
    id: "budgets",
    icon: PiggyBank,
    label: "Orçamentos",
    href: "/dashboard/budgets",
  },
  {
    id: "reports",
    icon: PieChart,
    label: "Relatórios",
    href: "/dashboard/reports",
  },
  {
    id: "recommendations",
    icon: Sparkles,
    label: "Recomendações",
    href: "/dashboard/recommendations",
  },
  {
    id: "categories",
    icon: PieChart,
    label: "Categorias",
    href: "/dashboard/categories",
  },
  {
    id: "accounts",
    icon: Wallet,
    label: "Minhas Contas",
    href: "/dashboard/accounts",
  },
  {
    id: "simulator",
    icon: TrendingUp,
    label: "Simulador E Se",
    href: "/dashboard/simulator",
  },
  {
    id: "inflation",
    icon: TrendingDown,
    label: "Simulador Inflação",
    href: "/dashboard/simulator/inflation",
  },
  {
    id: "recurring",
    icon: Repeat,
    label: "Assinaturas",
    href: "/dashboard/recurring",
  },
  { id: "goals", icon: Target, label: "Metas", href: "/dashboard/goals" },
  {
    id: "investments",
    icon: TrendingUp,
    label: "Investimentos",
    href: "/dashboard/investments",
  },
  {
    id: "financial-health",
    icon: HeartPulse,
    label: "Saúde Financeira",
    href: "/dashboard/financial-health",
  },
  {
    id: "sync",
    icon: LinkIcon,
    label: "Conexões & Hub",
    href: "/dashboard/sync",
  },
  {
    id: "feedback",
    icon: MessageSquare,
    label: "Feedback & Suporte",
    href: "/dashboard/feedback",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      style={isOpen ? { position: 'fixed', left: 0, top: 0, bottom: 0, transform: 'translateX(0)' } : {}}
    >
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <span className={styles.logoIcon}>✦</span> Miu Controle
        <button className="ml-auto lg:hidden text-white" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className={styles.nav}>
        <div className={styles.navSectionTitle}>PRINCIPAL</div>
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.id} href={item.href} onClick={onClose} style={{textDecoration: 'none'}}>
              <div className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
                <Icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}

         <div className={styles.navSectionTitle}>PLANEJAMENTO</div>
         {menuItems.slice(5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.id} href={item.href} onClick={onClose} style={{textDecoration: 'none'}}>
               <div className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
                <Icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
        
        <Link href="/dashboard/projections" onClick={onClose} style={{textDecoration: 'none'}}>
             <div className={`${styles.navItem} ${pathname === "/dashboard/projections" ? styles.navItemActive : ""}`}>
                <TrendingUp size={18} />
                Projeções
             </div>
        </Link>

        <div className={styles.navSectionTitle}>CONTA</div>
          <Link href="/dashboard/profile" onClick={onClose} style={{textDecoration: 'none'}}>
             <div className={`${styles.navItem} ${pathname === "/dashboard/profile" ? styles.navItemActive : ""}`}>
                <User size={18} />
                Perfil
             </div>
          </Link>
          <Link href="/dashboard/settings" onClick={onClose} style={{textDecoration: 'none'}}>
             <div className={`${styles.navItem} ${pathname === "/dashboard/settings" ? styles.navItemActive : ""}`}>
                <Settings size={18} />
                Configurações
             </div>
          </Link>
      </div>

      {/* User Footer */}
      <div className={styles.userFooter}>
        <div className={styles.userCard}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className={styles.userAvatar}>
              <AvatarImage src={getFullImageUrl(user?.avatarUrl)} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-transparent text-white font-bold text-xs">
                {(user?.fullName || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-bold truncate text-white">
                {user?.fullName || "Usuário"}
              </p>
              <p className="text-xs text-gray-400 truncate">Pro Member</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
            title="Sair"
          >
            <LogOut size={16} />
            <span className="text-xs font-semibold hidden md:inline-block">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
