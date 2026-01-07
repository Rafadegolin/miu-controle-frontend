import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryType, CreateCategoryDto, Category } from "@/types/api";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CategoryIconSelector } from "./CategoryIconSelector";
import { ACCOUNT_COLORS } from "@/constants/accounts";

interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Category | null;
}

export function CreateCategoryModal({ isOpen, onClose, initialData }: CreateCategoryModalProps) {
    const { createCategory, isCreatingCategory, updateCategory, isUpdatingCategory } = useCategories();
    const [formData, setFormData] = useState<CreateCategoryDto>({
        name: "",
        type: CategoryType.EXPENSE,
        icon: "shopping-bag",
        color: ACCOUNT_COLORS[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                type: initialData.type,
                icon: initialData.icon || "shopping-bag",
                color: initialData.color,
            });
        } else {
            setFormData({
                name: "",
                type: CategoryType.EXPENSE,
                icon: "shopping-bag",
                color: ACCOUNT_COLORS[0],
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (initialData) {
                await updateCategory({ id: initialData.id, data: formData });
                toast.success("Categoria atualizada com sucesso!");
            } else {
                await createCategory(formData);
                toast.success("Categoria criada com sucesso!");
            }
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(initialData ? "Erro ao atualizar categoria." : "Erro ao criar categoria.");
        }
    };

    const isLoading = isCreatingCategory || isUpdatingCategory;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#06181b] border border-white/10 text-white shadow-2xl shadow-black/50">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        {initialData ? "Editar Categoria" : "Nova Categoria"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-gray-400">Tipo da Categoria</Label>
                         <Select 
                            value={formData.type} 
                            onValueChange={(val) => setFormData({...formData, type: val as CategoryType})}
                            disabled={!!initialData} // Disable type change on edit to prevent issues
                        >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#32d6a5]/50 focus:ring-1">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#06181b] border-white/10 text-white">
                                <SelectItem value={CategoryType.EXPENSE} className="focus:bg-white/10 focus:text-white">Despesa</SelectItem>
                                <SelectItem value={CategoryType.INCOME} className="focus:bg-white/10 focus:text-white">Receita</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-400">Nome da Categoria</Label>
                        <Input 
                            id="name" 
                            placeholder="Ex: Alimentação, Salário..." 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#32d6a5]/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-400">Ícone</Label>
                        <CategoryIconSelector 
                            value={formData.icon || "shopping-bag"}
                            onChange={(icon) => setFormData({...formData, icon})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-400">Cor de Identificação</Label>
                        <div className="flex flex-wrap gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                            {ACCOUNT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                                        formData.color === color 
                                            ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                                            : "border-transparent hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setFormData({...formData, color})}
                                />
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                         <Button 
                            type="button" 
                            className="bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                            onClick={onClose} 
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#20bca3]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    {initialData ? "Salvando..." : "Criando..."}
                                </>
                            ) : (
                                initialData ? "Salvar Alterações" : "Criar Categoria"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
