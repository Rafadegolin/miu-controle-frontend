import { TransactionStatsMonthly } from "@/types/api";
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
import { ArrowDownRight, ArrowUpRight, Wallet, PieChart } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";
import { formatCurrency } from "@/lib/utils";

interface TransactionStatsProps {
    stats: TransactionStatsMonthly | null;
    isLoading: boolean;
}

export function TransactionStats({ stats, isLoading }: TransactionStatsProps) {
    if (isLoading) {
        return (
            <div className={`${styles.glassCard} ${styles.colSpan12} mb-6`}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="flex flex-col gap-6 mb-8 w-full">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={styles.glassCard}>
                    <div className={styles.cardHeader}>
                         <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
                            <Wallet size={24} />
                        </div>
                    </div>
                    <div>
                        <p className={styles.statLabel}>Saldo do Mês</p>
                        <h3 className={styles.statValue}>{formatCurrency(stats.balance)}</h3>
                    </div>
                </div>

                <div className={styles.glassCard}>
                    <div className={styles.cardHeader}>
                         <div className="p-2 bg-[#32d6a5]/10 rounded-lg text-[#32d6a5]">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                    <div>
                        <p className={styles.statLabel}>Receitas</p>
                        <h3 className={styles.statValue} style={{color: '#32d6a5'}}>{formatCurrency(stats.income)}</h3>
                    </div>
                </div>

                <div className={styles.glassCard}>
                    <div className={styles.cardHeader}>
                         <div className="p-2 bg-red-400/10 rounded-lg text-red-400">
                            <ArrowDownRight size={24} />
                        </div>
                    </div>
                    <div>
                        <p className={styles.statLabel}>Despesas</p>
                        <h3 className={styles.statValue} style={{color: '#f87171'}}>{formatCurrency(stats.expenses)}</h3>
                    </div>
                </div>
            </div>

            {/* Income vs Expenses Comparison Chart */}
            <div className={styles.glassCard}>
                <h4 className={styles.cardTitle}>
                    <PieChart size={20} className="text-[#32d6a5] mr-2" />
                    Receitas vs Despesas
                </h4>
                <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={[
                                { name: 'Receitas', value: stats.income, color: '#32d6a5' },
                                { name: 'Despesas', value: stats.expenses, color: '#f87171' },
                                { name: 'Saldo', value: stats.balance, color: stats.balance >= 0 ? '#32d6a5' : '#f87171' }
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: '#94a3b8', fontSize: 14 }}
                                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            />
                            <YAxis 
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ 
                                    borderRadius: '12px', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    backgroundColor: '#06181b',
                                    color: 'white'
                                }}
                                formatter={(value: number) => [formatCurrency(value), '']}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                                {[
                                    { name: 'Receitas', value: stats.income, color: '#32d6a5' },
                                    { name: 'Despesas', value: stats.expenses, color: '#f87171' },
                                    { name: 'Saldo', value: stats.balance, color: stats.balance >= 0 ? '#32d6a5' : '#f87171' }
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`${styles.glassCard} lg:col-span-2`}>
                    <h4 className={styles.cardTitle}>Gastos por Categoria</h4>
                    <div className="h-[300px] w-full mt-4">
                        {stats.categoryBreakdown.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.categoryBreakdown} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        width={100} 
                                        tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                        axisLine={false} 
                                        tickLine={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#06181b' }}
                                        formatter={(value: number) => [formatCurrency(value), 'Total']}
                                    />
                                    <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20}>
                                        {stats.categoryBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || '#32d6a5'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <p>Sem dados de gastos para este mês.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Strict Breakdown List */}
                <div className={`${styles.glassCard} flex flex-col`}>
                    <h4 className={styles.cardTitle}>Top Categorias</h4>
                    <div className={`flex-1 overflow-y-auto space-y-4 pr-2 mt-4 ${styles.customScroll} max-h-[300px]`}>
                        {stats.categoryBreakdown
                            .sort((a, b) => b.total - a.total)
                            .slice(0, 6)
                            .map((cat, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <div className={styles.listLeft}>
                                    <div 
                                        className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white text-xs shadow-lg"
                                        style={{ backgroundColor: cat.color }}
                                    >
                                        {cat.icon || "•"}
                                    </div>
                                    <span className="text-sm font-medium text-gray-200 truncate max-w-[120px]" title={cat.name}>
                                        {cat.name}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-white">
                                    {formatCurrency(cat.total)}
                                </span>
                            </div>
                        ))}
                         {stats.categoryBreakdown.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">Sem dados.</p>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
}
