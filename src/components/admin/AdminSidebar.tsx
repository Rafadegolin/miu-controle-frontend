"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Server, Globe, Tag, ArrowRightLeft, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/dashboard/admin", label: "Visão Geral", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/admin/users", label: "Usuários", icon: Users },
  { href: "/dashboard/admin/currencies", label: "Moedas", icon: Globe },
  { href: "/dashboard/admin/brands", label: "Marcas", icon: Tag },
  { href: "/dashboard/admin/exchange-rates", label: "Câmbio", icon: ArrowRightLeft },
  { href: "/dashboard/admin/feedback", label: "Feedbacks", icon: MessageSquare },
  { href: "/dashboard/admin/system", label: "Sistema", icon: Server },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-[#0b1215]/50 h-full p-4">
      <div className="mb-6 px-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Administração</h3>
      </div>
      
      <nav className="space-y-1">
        {adminLinks.map((link) => {
          const isActive = link.exact 
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#32d6a5]/10 text-[#32d6a5]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
