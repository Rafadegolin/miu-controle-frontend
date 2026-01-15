"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Menu, Plus } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Home, Wallet, PieChart, User } from "lucide-react";
import { LevelWidget } from "@/components/gamification/LevelWidget";
import { SocketProvider } from "@/contexts/SocketContext";
import { GamificationListener } from "@/components/gamification/GamificationListener";
import { SyncListener } from "@/components/sync/SyncListener";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <SocketProvider>
        <GamificationListener />
        <SyncListener />
        <div className={styles.dashboardContainer}>
        {/* DESKTOP SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Mobile Header Overlay */}
          {isSidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Top Bar */}
          <header className={styles.header}>
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-white"
              >
                <Menu />
              </button>
              <span className="font-bold text-xl text-white">Miu</span>
            </div>

            <div className="hidden lg:flex items-center text-gray-400 text-sm gap-2">
              <span className={styles.pageTitle}>
                 {/* Capitalize page name */}
                 {pathname.split("/").pop() === "dashboard" ? "Visão Geral" : pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()!.slice(1)}
              </span>
            </div>

            <div className={styles.headerActions}>
              <LevelWidget />
              <button className={styles.iconBtn}>
                 <Plus size={20} />
              </button>
              <div className="relative">
                <button className={styles.iconBtn}>
                  <Bell size={20} />
                </button>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#32d6a5] rounded-full border-2 border-[#020809]"></span>
              </div>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <main className={styles.scrollableArea}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ height: '100%' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* MOBILE BOTTOM NAV (Simplified for Mobile) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#06181b] border-t border-white/10 px-6 py-2 flex justify-between items-center z-50">
          <Link href="/dashboard">
             <button className={pathname === "/dashboard" ? "text-[#32d6a5]" : "text-gray-400"}>
                <Home size={24} />
             </button>
          </Link>
          <Link href="/dashboard/transactions">
             <button className={pathname === "/dashboard/transactions" ? "text-[#32d6a5]" : "text-gray-400"}>
                <Wallet size={24} />
             </button>
          </Link>
          <div className="relative -top-5">
             <button className="w-12 h-12 bg-[#32d6a5] rounded-full flex items-center justify-center text-[#020809] shadow-lg shadow-[#32d6a5]/30">
                <Plus size={24} />
             </button>
          </div>
          <Link href="/dashboard/reports">
             <button className={pathname === "/dashboard/reports" ? "text-[#32d6a5]" : "text-gray-400"}>
                <PieChart size={24} />
             </button>
          </Link>
          <Link href="/dashboard/profile">
             <button className={pathname === "/dashboard/profile" ? "text-[#32d6a5]" : "text-gray-400"}>
                <User size={24} />
             </button>
          </Link>
        </nav>
        </div>
      </SocketProvider>
    </ProtectedRoute>
  );
}
