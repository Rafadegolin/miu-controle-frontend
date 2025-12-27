import { Trash2, AlertCircle, Edit2, BarChart2 } from "lucide-react";
import { resolveCategoryIcon } from "./CategoryIconSelector";
import { Category } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CategoryStatsModal } from "./CategoryStatsModal";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export function CategoryList({ categories, onEdit, onDelete, isDeleting }: CategoryListProps) {
    const [statsCategory, setStatsCategory] = useState<Category | null>(null);

    if (categories.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Nenhuma categoria encontrada.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => {
                    // Try to resolve by icon field first, then by name, then fallback
                    const Icon = resolveCategoryIcon(category.icon) || 
                                 resolveCategoryIcon(category.name) || 
                                 AlertCircle;
                    
                    return (
                        <Card key={category.id} className="p-4 flex items-center gap-4 group hover:shadow-md transition-all border-[#00404f]/10">
                            <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0"
                                style={{ backgroundColor: category.color || "#00404f" }}
                            >
                                <Icon size={24} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#00404f] text-lg truncate">{category.name}</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                                    {category.isSystem ? "Sistema" : "Personalizada"}
                                </p>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                    variant="ghost" 
                                    size="icon-sm" 
                                    className="text-blue-600 hover:bg-blue-50"
                                    onClick={() => setStatsCategory(category)}
                                    title="Estatísticas"
                                >
                                    <BarChart2 size={18} />
                                </Button>
                                
                                {!category.isSystem && (
                                    <>
                                        <Button 
                                            variant="ghost" 
                                            size="icon-sm" 
                                            className="text-[#00404f] hover:bg-[#00404f]/10"
                                            onClick={() => onEdit(category)}
                                        >
                                            <Edit2 size={18} />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon-sm" 
                                            className="text-red-500 hover:bg-red-50"
                                            onClick={() => onDelete(category.id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <CategoryStatsModal 
                category={statsCategory} 
                isOpen={!!statsCategory} 
                onClose={() => setStatsCategory(null)} 
            />
        </>
    );
}
