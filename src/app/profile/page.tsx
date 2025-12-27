"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/Card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { DeleteAccountModal } from "@/components/profile/DeleteAccountModal";
import { Shield, User, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Tab = "general" | "security" | "danger";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("general");

  if (!user) {
    return null; // Or loading state / redirect handled by middleware/layout
  }

  return (
    <div className="min-h-screen bg-[#F0F9FA] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-white/50 rounded-lg transition-colors text-[#00404f]"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#00404f]">Meu Perfil</h1>
            <p className="text-[#3c88a0]">Gerencie suas informações e segurança.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar Tabs */}
          <div className="md:col-span-3 space-y-2">
            <Card className="p-2 overflow-hidden">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "general"
                    ? "bg-[#00404f]/5 text-[#00404f]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <User size={18} />
                Geral
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "security"
                    ? "bg-[#00404f]/5 text-[#00404f]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Shield size={18} />
                Segurança
              </button>
              <button
                onClick={() => setActiveTab("danger")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "danger"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <AlertTriangle size={18} />
                Zona de Perigo
              </button>
            </Card>
          </div>

          {/* Content Area */}
          <div className="md:col-span-9 space-y-6">
            {activeTab === "general" && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <h2 className="text-lg font-bold text-[#00404f] mb-6">Foto de Perfil</h2>
                  <AvatarUpload user={user} />
                </Card>

                <Card>
                  <h2 className="text-lg font-bold text-[#00404f] mb-6">Informações Pessoais</h2>
                  <ProfileForm user={user} />
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <h2 className="text-lg font-bold text-[#00404f] mb-6">Alterar Senha</h2>
                  <ChangePasswordForm />
                </Card>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="space-y-6 animate-fade-in">
                <Card className="border-red-100">
                  <h2 className="text-lg font-bold text-red-700 mb-2">Excluir Conta</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e você perderá acesso a todos os seus dados.
                  </p>
                  <DeleteAccountModal />
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
