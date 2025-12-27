"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Target,
  TrendingUp,
  Link as LinkIcon,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    id: "reports",
    icon: PieChart,
    label: "Relatórios",
    href: "/dashboard/reports",
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
  { id: "goals", icon: Target, label: "Metas", href: "/dashboard/goals" },
  {
    id: "investments",
    icon: TrendingUp,
    label: "Investimentos",
    href: "/dashboard/investments",
  },
  {
    id: "sync",
    icon: LinkIcon,
    label: "Conexões & Hub",
    href: "/dashboard/sync",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className={`
      fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#00404f]/5 
      transform transition-transform duration-300 lg:transform-none flex flex-col
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#00404f]/5">
        <div className="w-8 h-8 bg-[#00404f] rounded-lg flex items-center justify-center text-[#7cddb1] font-bold shadow-md mr-3">
          M
        </div>
        <span className="font-bold text-xl tracking-tight">Miu</span>
        <button className="ml-auto lg:hidden" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.id} href={item.href} onClick={onClose}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#00404f] text-[#7cddb1] shadow-lg shadow-[#00404f]/20"
                    : "text-[#00404f]/70 hover:bg-[#00404f]/5"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                {item.label}
              </button>
            </Link>
          );
        })}

        <div className="pt-6 mt-6 border-t border-[#00404f]/5 px-4 pb-2">
          <p className="text-xs font-bold text-[#00404f]/40 uppercase mb-2">
            Conta
          </p>
          <Link href="/dashboard/profile" onClick={onClose}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all mb-1 ${
                pathname === "/dashboard/profile"
                  ? "text-[#00404f] bg-[#00404f]/5"
                  : "text-[#00404f]/70 hover:bg-[#00404f]/5"
              }`}
            >
              <User size={18} /> Perfil
            </button>
          </Link>
          <Link href="/dashboard/settings" onClick={onClose}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === "/dashboard/settings"
                  ? "text-[#00404f] bg-[#00404f]/5"
                  : "text-[#00404f]/70 hover:bg-[#00404f]/5"
              }`}
            >
              <Settings size={18} /> Configurações
            </button>
          </Link>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-[#00404f]/5">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#00404f]/5 cursor-pointer transition-colors">
          <Avatar className="w-9 h-9 border border-[#00404f]/10 shadow-sm">
            <AvatarImage src={user?.avatarUrl} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-[#00404f]/10 text-[#00404f] font-bold text-xs">
              {(user?.fullName || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">
              {user?.fullName || "Usuário"}
            </p>
            <p className="text-xs text-[#00404f]/50 truncate">Pro Member</p>
          </div>
          <button onClick={logout}>
            <LogOut
              size={16}
              className="text-[#ff6b6b] hover:text-[#ff6b6b]/80"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
