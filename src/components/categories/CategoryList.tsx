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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => {
                    // Try to resolve by icon field first, then by name, then fallback
                    const Icon = resolveCategoryIcon(category.icon) || 
                                 resolveCategoryIcon(category.name) || 
                                 AlertCircle;
                    
                    return (
                         <div 
                            key={category.id} 
                            className="relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 flex items-center gap-4"
                        >
                             {/* Color Accent Indicator */}
                            <div 
                                className="absolute top-0 left-0 w-1 h-full opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: category.color || "#32d6a5" }}
                            />

                            <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-white/10 shrink-0"
                                style={{ 
                                    backgroundColor: category.color ? `${category.color}20` : '#32d6a520',
                                    color: category.color || '#32d6a5'
                                }}
                            >
                                <Icon size={24} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-lg truncate group-hover:text-[#32d6a5] transition-colors">{category.name}</h4>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                    {category.isSystem ? "Sistema" : "Manual"}
                                </p>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 bg-[#06181b]/90 rounded-lg p-1 border border-white/10 shadow-xl backdrop-blur-md">
                                <Button 
                                    variant="ghost" 
                                    size="icon-sm" 
                                    className="text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 h-8 w-8"
                                    onClick={() => setStatsCategory(category)}
                                    title="Estatísticas"
                                >
                                    <BarChart2 size={16} />
                                </Button>
                                
                                {!category.isSystem && (
                                    <>
                                        <Button 
                                            variant="ghost" 
                                            size="icon-sm" 
                                            className="text-white hover:bg-white/10 h-8 w-8"
                                            onClick={() => onEdit(category)}
                                        >
                                            <Edit2 size={16} />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon-sm" 
                                            className="text-red-400 hover:bg-red-400/10 hover:text-red-300 h-8 w-8"
                                            onClick={() => onDelete(category.id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
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
