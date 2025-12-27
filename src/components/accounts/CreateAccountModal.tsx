import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountType, CreateAccountDto, Account } from "@/types/api";
import { useAccounts } from "@/hooks/useAccounts";
import { toast } from "sonner";
import { Loader2, Palette } from "lucide-react";

import { ACCOUNT_COLORS, POPULAR_BANKS } from "@/constants/accounts";

interface CreateAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    accountToEdit?: Account | null;
}

export function CreateAccountModal({ isOpen, onClose, accountToEdit }: CreateAccountModalProps) {
    const { createAccount, updateAccount, isCreatingAccount, isUpdatingAccount } = useAccounts();
    const [formData, setFormData] = useState<CreateAccountDto>({
        name: "",
        type: AccountType.CHECKING,
        initialBalance: 0,
        color: ACCOUNT_COLORS[0],
        bankCode: "260", // Default to Nubank as per user preference/popularity or just generic
        icon: "credit-card"
    });

    useEffect(() => {
        if (isOpen) {
            if (accountToEdit) {
                setFormData({
                    name: accountToEdit.name,
                    type: accountToEdit.type,
                    initialBalance: Number(accountToEdit.initialBalance) || 0,
                    color: accountToEdit.color,
                    bankCode: accountToEdit.bankCode || "000",
                    icon: accountToEdit.icon || "wallet"
                });
            } else {
                setFormData({
                    name: "",
                    type: AccountType.CHECKING,
                    initialBalance: 0,
                    color: ACCOUNT_COLORS[0],
                    bankCode: "260",
                    icon: "credit-card"
                });
            }
        }
    }, [isOpen, accountToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (accountToEdit) {
                await updateAccount({ id: accountToEdit.id, data: formData });
                toast.success("Conta atualizada com sucesso!");
            } else {
                await createAccount(formData);
                toast.success("Conta criada com sucesso!");
            }
            onClose();
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.message || (accountToEdit ? "Erro ao atualizar conta." : "Erro ao criar conta.");
            const formattedMessage = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
            toast.error(formattedMessage);
        }
    };

    const isLoading = isCreatingAccount || isUpdatingAccount;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#00404f]">
                        {accountToEdit ? "Editar Conta" : "Nova Conta"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Conta</Label>
                        <Input 
                            id="name" 
                            placeholder="Ex: NuBank, Carteira..." 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="bank">Instituição</Label>
                             <Select 
                                 value={formData.bankCode} 
                                 onValueChange={(val) => setFormData({...formData, bankCode: val})}
                             >
                                 <SelectTrigger>
                                     <SelectValue placeholder="Selecione" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     {POPULAR_BANKS.map(bank => (
                                         <SelectItem key={bank.code} value={bank.code}>{bank.name}</SelectItem>
                                     ))}
                                 </SelectContent>
                             </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select 
                                value={formData.type} 
                                onValueChange={(val) => {
                                    // Auto-select icon based on type if not manually set (simple logic)
                                    let icon = "wallet";
                                    if (val === AccountType.CHECKING) icon = "landmark";
                                    if (val === AccountType.CREDIT_CARD) icon = "credit-card";
                                    if (val === AccountType.INVESTMENT) icon = "trending-up";
                                    
                                    setFormData({...formData, type: val as AccountType, icon})
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={AccountType.CHECKING}>Corrente</SelectItem>
                                    <SelectItem value={AccountType.SAVINGS}>Poupança</SelectItem>
                                    <SelectItem value={AccountType.CREDIT_CARD}>Cartão de Crédito</SelectItem>
                                    <SelectItem value={AccountType.INVESTMENT}>Investimento</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="balance">Saldo Inicial</Label>
                            <Input 
                                id="balance" 
                                type="number" 
                                step="0.01"
                                value={formData.initialBalance}
                                onChange={(e) => setFormData({...formData, initialBalance: parseFloat(e.target.value) || 0})}
                                required
                                disabled={!!accountToEdit} 
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="icon">Ícone (Sistema)</Label>
                            {/* Hidden or read-only for now, mapped from type */}
                            <Input 
                                id="icon" 
                                value={formData.icon}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Cor de Identificação</Label>
                        <div className="flex flex-wrap gap-2">
                            {ACCOUNT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                                        formData.color === color 
                                            ? "border-black scale-110" 
                                            : "border-transparent hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setFormData({...formData, color})}
                                />
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                         <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Processando...
                                </>
                            ) : (
                                accountToEdit ? "Salvar Alterações" : "Criar Conta"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
