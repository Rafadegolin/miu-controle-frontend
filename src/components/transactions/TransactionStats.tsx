import { TransactionStatsMonthly } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

interface TransactionStatsProps {
    stats: TransactionStatsMonthly | null;
    isLoading: boolean;
}

export function TransactionStats({ stats, isLoading }: TransactionStatsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="space-y-6 mb-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 flex items-center justify-between bg-gradient-to-br from-[#00404f] to-[#002f3a] text-white border-none shadow-lg">
                    <div>
                        <p className="text-sm font-medium opacity-80 mb-1">Saldo do Mês</p>
                        <h3 className="text-2xl font-bold">{formatCurrency(stats.balance)}</h3>
                    </div>
                    <div className="p-3 bg-white/10 rounded-full">
                        <Wallet size={24} className="text-white" />
                    </div>
                </Card>

                <Card className="p-6 flex items-center justify-between border-[#00404f]/10 shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Receitas</p>
                        <h3 className="text-2xl font-bold text-[#007459]">{formatCurrency(stats.income)}</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-full">
                        <ArrowUpCircle size={24} className="text-[#007459]" />
                    </div>
                </Card>

                <Card className="p-6 flex items-center justify-between border-[#00404f]/10 shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Despesas</p>
                        <h3 className="text-2xl font-bold text-[#00404f]">{formatCurrency(stats.expenses)}</h3>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-full">
                        <ArrowDownCircle size={24} className="text-[#00404f]" />
                    </div>
            </Card>
            </div>

            {/* Income vs Expenses Comparison Chart */}
            <Card className="p-6 border-[#00404f]/10 shadow-sm">
                <h4 className="font-bold text-[#00404f] mb-6">Receitas vs Despesas</h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={[
                                { name: 'Receitas', value: stats.income, color: '#007459' },
                                { name: 'Despesas', value: stats.expenses, color: '#00404f' },
                                { name: 'Saldo', value: stats.balance, color: stats.balance >= 0 ? '#10B981' : '#EF4444' }
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: '#64748b', fontSize: 14 }}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis 
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={{ stroke: '#cbd5e1' }}
                                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ 
                                    borderRadius: '8px', 
                                    border: 'none', 
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    backgroundColor: 'white'
                                }}
                                formatter={(value: number) => [formatCurrency(value), '']}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                                {[
                                    { name: 'Receitas', value: stats.income, color: '#007459' },
                                    { name: 'Despesas', value: stats.expenses, color: '#00404f' },
                                    { name: 'Saldo', value: stats.balance, color: stats.balance >= 0 ? '#10B981' : '#EF4444' }
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6 border-[#00404f]/10 shadow-sm">
                    <h4 className="font-bold text-[#00404f] mb-6">Gastos por Categoria</h4>
                    <div className="h-[300px] w-full">
                        {stats.categoryBreakdown.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.categoryBreakdown} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        width={100} 
                                        tick={{ fill: '#64748b', fontSize: 12 }} 
                                        axisLine={false} 
                                        tickLine={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: number) => [formatCurrency(value), 'Total']}
                                    />
                                    <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20}>
                                        {stats.categoryBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || '#00404f'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <p>Sem dados de gastos para este mês.</p>
                            </div>
                        )}
                    </div>
                </Card>
                
                {/* Could add another chart here or strict breakdown list */}
                <Card className="p-6 border-[#00404f]/10 shadow-sm h-full flex flex-col">
                    <h4 className="font-bold text-[#00404f] mb-4">Top Categorias</h4>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {stats.categoryBreakdown
                            .sort((a, b) => b.total - a.total)
                            .slice(0, 6)
                            .map((cat, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                                        style={{ backgroundColor: cat.color }}
                                    >
                                        {cat.icon || "•"}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]" title={cat.name}>
                                        {cat.name}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-[#00404f]">
                                    {formatCurrency(cat.total)}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
