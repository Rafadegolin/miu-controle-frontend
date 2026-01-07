import { 
    ShoppingBag, Utensils, Home, Car, Zap, HeartPulse, GraduationCap, 
    Plane, Gift, Smartphone, Wifi, Coffee, Music, Film, Gamepad, 
    Briefcase, DollarSign, PiggyBank, TrendingUp, Landmark, AlertCircle,
    Baby, Dog, Search, Wrench, Hammer, Monitor, Book, Smile
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryIconSelectorProps {
    value: string;
    onChange: (icon: string) => void;
}

const ICONS = [
    { name: "shopping-bag", icon: ShoppingBag },
    { name: "utensils", icon: Utensils },
    { name: "home", icon: Home },
    { name: "car", icon: Car },
    { name: "zap", icon: Zap },
    { name: "heart-pulse", icon: HeartPulse },
    { name: "graduation-cap", icon: GraduationCap },
    { name: "plane", icon: Plane },
    { name: "gift", icon: Gift },
    { name: "smartphone", icon: Smartphone },
    { name: "wifi", icon: Wifi },
    { name: "coffee", icon: Coffee },
    { name: "music", icon: Music },
    { name: "film", icon: Film },
    { name: "gamepad", icon: Gamepad },
    { name: "briefcase", icon: Briefcase },
    { name: "dollar-sign", icon: DollarSign },
    { name: "piggy-bank", icon: PiggyBank },
    { name: "trending-up", icon: TrendingUp },
    { name: "landmark", icon: Landmark },
    { name: "alert-circle", icon: AlertCircle },
    { name: "baby", icon: Baby },
    { name: "dog", icon: Dog },
    { name: "search", icon: Search },
    { name: "wrench", icon: Wrench },
    { name: "hammer", icon: Hammer },
    { name: "monitor", icon: Monitor },
    { name: "book", icon: Book },
    { name: "smile", icon: Smile },
];

export function CategoryIconSelector({ value, onChange }: CategoryIconSelectorProps) {
    return (
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-[200px] overflow-y-auto p-3 border border-white/10 rounded-xl bg-[#082024] custom-scrollbar">
            {ICONS.map((item) => {
                const Icon = item.icon;
                const isSelected = value === item.name;
                
                return (
                    <button
                        key={item.name}
                        type="button"
                        onClick={() => onChange(item.name)}
                        className={cn(
                            "flex items-center justify-center p-2.5 rounded-lg transition-all duration-200",
                            isSelected 
                                ? "bg-[#32d6a5]/20 text-[#32d6a5] ring-1 ring-[#32d6a5] shadow-[0_0_8px_rgba(50,214,165,0.3)] scale-110" 
                                : "text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105"
                        )}
                        title={item.name}
                    >
                        <Icon size={20} />
                    </button>
                );
            })}
        </div>
    );
}

// Map with aliases
const ICON_MAP: Record<string, any> = {};
ICONS.forEach(item => {
    ICON_MAP[item.name] = item.icon;
    // Add variations/aliases
    ICON_MAP[item.name.replace("-", "_")] = item.icon;
    ICON_MAP[item.name.replace("-", "")] = item.icon;
});

// Common aliases for seed data consistency
const ALIASES: Record<string, string> = {
    "food": "utensils",
    "meal": "utensils",
    "transport": "car",
    "transportation": "car",
    "house": "home",
    "housing": "home",
    "salary": "dollar-sign",
    "income": "trending-up",
    "money": "dollar-sign",
    "groceries": "shopping-bag",
    "shopping": "shopping-bag",
    "health": "heart-pulse",
    "healthcare": "heart-pulse",
    "education": "graduation-cap",
    "school": "graduation-cap",
    "travel": "plane",
    "trip": "plane",
    "gifts": "gift",
    "entertainment": "film",
    "fun": "gamepad",
    "bills": "receipt",
    "utilities": "zap",
    "other": "alert-circle",
    "others": "alert-circle",
    "general": "alert-circle",

    // Portuguese Aliases
    "alimentacao": "utensils",
    "restaurante": "utensils",
    "comida": "utensils",
    "transporte": "car",
    "carro": "car",
    "combustivel": "car",
    "uber": "car",
    "casa": "home",
    "moradia": "home",
    "aluguel": "home",
    "condominio": "home",
    "salario": "dollar-sign",
    "investimento": "trending-up",
    "investimentos": "trending-up",
    "renda": "trending-up",
    "saude": "heart-pulse",
    "farmacia": "heart-pulse",
    "medico": "heart-pulse",
    "educacao": "graduation-cap",
    "escola": "graduation-cap",
    "faculdade": "graduation-cap",
    "cursos": "graduation-cap",
    "viagem": "plane",
    "viagens": "plane",
    "lazer": "gamepad",
    "entretenimento": "film",
    "cinema": "film",
    "compras": "shopping-bag",
    "mercado": "shopping-bag",
    "roupas": "shopping-bag",
    "contas": "receipt",
    "contas fixas": "receipt",
    "luz": "zap",
    "energia": "zap",
    "agua": "coffee", // closest
    "internet": "wifi",
    "assinaturas": "receipt",
    "streaming": "film",
    "servicos": "briefcase",
    "trabalho": "briefcase",
    "presentes": "gift",
    "animal": "dog",
    "pet": "dog",
    "filhos": "baby"
};

export function resolveCategoryIcon(name?: string) {
    if (!name) return undefined;
    
    // Normalize name: lowercase, trim, remove accents
    const normalized = name.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Check direct map
    if (ICON_MAP[normalized]) return ICON_MAP[normalized];
    
    // Check aliases
    if (ALIASES[normalized] && ICON_MAP[ALIASES[normalized]]) {
        return ICON_MAP[ALIASES[normalized]];
    }
    
    // Try without special chars (alphanumeric only)
    const simple = normalized.replace(/[^a-z0-9]/g, "");
    const matchingKey = Object.keys(ICON_MAP).find(k => k.replace(/[^a-z0-9]/g, "") === simple);
    if (matchingKey) return ICON_MAP[matchingKey];

    return undefined;
}

export function getCategoryIcon(name: string) {
    return resolveCategoryIcon(name) || AlertCircle;
}
