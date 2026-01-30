"use client";

import { useEffect, useState } from "react";
import { getUsers, banUser } from "@/services/admin.actions";
import { User, SubscriptionTier } from "@/types/api";
import { Loader2, Search, MoreVertical, ShieldAlert, UserCheck, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleBan = async (userId: string) => {
    try {
        await banUser(userId);
        toast.success("Usuário bloqueado com sucesso");
    } catch (error) {
        toast.error("Erro ao bloquear usuário");
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestão de Usuários</h1>
          <p className="text-gray-400">Listagem e controle de acesso.</p>
        </div>
        
        <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <Input 
                placeholder="Buscar por nome ou email..." 
                className="pl-10 bg-[#0b1215] border-white/10 text-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-[#0b1215] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
            <thead className="bg-white/5 border-b border-white/5">
                <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Usuário</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Plano</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Cadastro</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback>{user.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-white text-sm">{user.fullName}</p>
                                    <p className="text-gray-500 text-xs">{user.email}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                                user.subscriptionTier === 'PRO' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                user.subscriptionTier === 'FAMILY' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                'bg-gray-800 text-gray-400 border-gray-700'
                            }`}>
                                {user.subscriptionTier}
                            </span>
                        </td>
                         <td className="py-4 px-6">
                            {user.emailVerified ? (
                                <div className="flex items-center text-green-400 text-xs">
                                    <UserCheck size={14} className="mr-1" /> Verificado
                                </div>
                            ) : (
                                <div className="flex items-center text-yellow-400 text-xs">
                                    <ShieldAlert size={14} className="mr-1" /> Pendente
                                </div>
                            )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-400">
                            {formatDate(user.createdAt)}
                        </td>
                        <td className="py-4 px-6 text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4 text-gray-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#1a2327] border-gray-700 text-white">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10" onClick={() => handleBan(user.id)}>
                                        <ShieldAlert className="mr-2 h-4 w-4 text-red-400" />
                                        <span>Bloquear Acesso</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                                        <Shield className="mr-2 h-4 w-4 text-[#32d6a5]" />
                                        <span>Promover a Admin</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
