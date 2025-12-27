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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#00404f]">
                        {initialData ? "Editar Categoria" : "Nova Categoria"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Tipo</Label>
                         <Select 
                            value={formData.type} 
                            onValueChange={(val) => setFormData({...formData, type: val as CategoryType})}
                            disabled={!!initialData} // Disable type change on edit to prevent issues
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={CategoryType.EXPENSE}>Despesa</SelectItem>
                                <SelectItem value={CategoryType.INCOME}>Receita</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Categoria</Label>
                        <Input 
                            id="name" 
                            placeholder="Ex: Alimentação, Salário..." 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Ícone</Label>
                        <CategoryIconSelector 
                            value={formData.icon || "shopping-bag"}
                            onChange={(icon) => setFormData({...formData, icon})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Cor</Label>
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
