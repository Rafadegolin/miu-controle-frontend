"use client";

import { useState } from "react";
import { Bell, Menu, Home, Wallet, PieChart, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[#F0F9FA] font-sans text-[#00404f] overflow-hidden selection:bg-[#7cddb1] selection:text-[#00404f]">
        {/* DESKTOP SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Mobile Header Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Top Bar */}
          <header className="h-20 flex items-center justify-between px-6 border-b border-[#00404f]/5 bg-[#F0F9FA]/80 backdrop-blur-xl z-30 sticky top-0">
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-[#00404f]"
              >
                <Menu />
              </button>
              <span className="font-bold text-xl">Miu</span>
            </div>

            <div className="hidden lg:flex items-center text-[#00404f]/50 text-sm gap-2">
              <span className="px-2 py-1 rounded-md hover:bg-[#00404f]/5 cursor-pointer">
                /
              </span>
              <span className="px-2 py-1 rounded-md hover:bg-[#00404f]/5 cursor-pointer capitalize font-medium text-[#00404f]">
                {pathname.split("/").pop() || "dashboard"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell
                  size={20}
                  className="text-[#00404f]/60 hover:text-[#00404f] cursor-pointer transition-colors"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff6b6b] rounded-full border-2 border-[#F0F9FA]"></span>
              </div>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

        {/* MOBILE BOTTOM NAV */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#00404f]/5 px-6 py-2 flex justify-between items-center z-50 shadow-2xl">
          <Link href="/dashboard">
            <button
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dashboard"
                  ? "text-[#00404f]"
                  : "text-[#00404f]/40"
              }`}
            >
              <Home
                size={24}
                strokeWidth={pathname === "/dashboard" ? 2.5 : 2}
              />
            </button>
          </Link>
          <Link href="/dashboard/transactions">
            <button
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dashboard/transactions"
                  ? "text-[#00404f]"
                  : "text-[#00404f]/40"
              }`}
            >
              <Wallet
                size={24}
                strokeWidth={pathname === "/dashboard/transactions" ? 2.5 : 2}
              />
            </button>
          </Link>
          <div className="relative -top-6">
            <button className="w-14 h-14 bg-[#00404f] rounded-full flex items-center justify-center text-[#7cddb1] shadow-lg shadow-[#00404f]/30 border-4 border-[#F0F9FA] hover:scale-105 transition-transform">
              <Plus size={28} />
            </button>
          </div>
          <Link href="/dashboard/reports">
            <button
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dashboard/reports"
                  ? "text-[#00404f]"
                  : "text-[#00404f]/40"
              }`}
            >
              <PieChart
                size={24}
                strokeWidth={pathname === "/dashboard/reports" ? 2.5 : 2}
              />
            </button>
          </Link>
          <Link href="/dashboard/profile">
            <button
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dashboard/profile"
                  ? "text-[#00404f]"
                  : "text-[#00404f]/40"
              }`}
            >
              <User
                size={24}
                strokeWidth={pathname === "/dashboard/profile" ? 2.5 : 2}
              />
            </button>
          </Link>
        </nav>
      </div>
    </ProtectedRoute>
  );
}
