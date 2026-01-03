
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
    Calendar as CalendarIcon, 
    Clock, 
    Sparkles, 
    TrendingUp, 
    TrendingDown, 
    Coins, 
    Receipt, 
    Wallet, 
    Users,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import { formatDate, getTodayDateString, formatCurrency } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AttendanceStatus } from '../types';

const SkeletonCard = () => (
    <div className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-white/5 rounded-2xl w-12 h-12"></div>
            <div className="bg-white/5 px-3 py-1 rounded-full w-16 h-4"></div>
        </div>
        <div className="bg-white/5 w-24 h-3 mb-2 rounded"></div>
        <div className="bg-white/5 w-32 h-8 rounded"></div>
    </div>
);

const SkeletonChart = () => (
    <div className="bg-gray-900/50 p-10 rounded-[3.5rem] border border-white/5 shadow-sm animate-pulse h-[450px] flex flex-col">
        <div className="flex items-center justify-between mb-12">
            <div className="space-y-3">
                <div className="bg-white/5 w-32 h-6 rounded"></div>
                <div className="bg-white/5 w-24 h-3 rounded"></div>
            </div>
            <div className="bg-white/5 w-12 h-6 rounded"></div>
        </div>
        <div className="flex-1 bg-white/5 rounded-[2rem] opacity-30"></div>
    </div>
);

export default function Dashboard() {
    const { income, expenses, attendance, staff, selectedDate, setSelectedDate, isLoading } = useData();
    const isToday = selectedDate === getTodayDateString();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    // Daily Metrics Calculations
    const dailyMetrics = useMemo(() => {
        const dailyInc = income
            .filter(item => item.date === selectedDate)
            .reduce((acc, curr) => acc + curr.amount, 0);
            
        const dailyExp = expenses
            .filter(item => item.date === selectedDate)
            .reduce((acc, curr) => acc + curr.amount, 0);
            
        const dailyAtt = attendance
            .filter(item => item.date === selectedDate && item.status === AttendanceStatus.PRESENT)
            .length;

        const profit = dailyInc - dailyExp;
        const margin = dailyInc > 0 ? (profit / dailyInc) * 100 : 0;

        return {
            income: dailyInc,
            expenses: dailyExp,
            profit: profit,
            staffPresent: dailyAtt,
            totalStaff: staff.length,
            margin: margin.toFixed(0)
        };
    }, [income, expenses, attendance, staff, selectedDate]);

    const monthlySummary = useMemo(() => {
        const data: { [key: string]: { income: number, expenses: number } } = {};
        const baseDate = new Date(selectedDate);

        for (let i = 0; i < 6; i++) {
            const date = new Date(baseDate.getFullYear(), baseDate.getMonth() - i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' });
            data[monthName] = { income: 0, expenses: 0 };
        }

        income.forEach(item => {
            const entryDate = new Date(item.date);
            const monthName = entryDate.toLocaleString('default', { month: 'short' });
            if (data[monthName]) data[monthName].income += item.amount;
        });

        expenses.forEach(item => {
            const entryDate = new Date(item.date);
            const monthName = entryDate.toLocaleString('default', { month: 'short' });
            if (data[monthName]) data[monthName].expenses += item.amount;
        });

        return Object.entries(data).map(([name, values]) => ({ name, ...values })).reverse();
    }, [income, expenses, selectedDate]);

    const dailyProfitData = useMemo(() => {
        const data: { name: string, profit: number, date: string }[] = [];
        const baseDate = new Date(selectedDate);
        for (let i = 6; i >= 0; i--) {
            const date = new Date(baseDate);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const dailyIncome = income.filter(item => item.date === dateString).reduce((acc, curr) => acc + curr.amount, 0);
            const dailyExpense = expenses.filter(item => item.date === dateString).reduce((acc, curr) => acc + curr.amount, 0);
            data.push({ name: dayName, profit: dailyIncome - dailyExpense, date: dateString });
        }
        return data;
    }, [income, expenses, selectedDate]);

    const handleDateTrigger = () => {
        if (dateInputRef.current) {
            try {
                dateInputRef.current.focus();
                if ('showPicker' in dateInputRef.current) {
                    dateInputRef.current.showPicker();
                } else {
                    dateInputRef.current.click();
                }
            } catch (e) {
                dateInputRef.current.click();
            }
        }
    };

    const dateDisplay = isToday ? 'TODAY' : formatDate(selectedDate).toUpperCase();

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary-600 rounded-2xl shadow-lg shadow-primary-600/20 text-white">
                            <Sparkles size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-sm font-black text-primary-600 uppercase tracking-[0.3em]">HotelPro Dashboard</h2>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter">
                        {greeting}, <span className="text-gray-400 dark:text-gray-600">Manager.</span>
                    </h1>
                    <div className="flex items-center gap-3 pt-2">
                         <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                            <TrendingUp size={12} /> Live Pulse
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">• {dateDisplay}</span>
                    </div>
                </div>

                <button 
                    onClick={handleDateTrigger}
                    className="flex items-center gap-4 px-8 py-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2rem] hover:ring-8 hover:ring-primary-500/5 transition-all group shadow-sm active:scale-95"
                >
                    <CalendarIcon size={20} className="text-primary-500 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1.5">Change Ledger Date</p>
                        <p className="text-base font-black dark:text-white leading-none tracking-tight">{formatDate(selectedDate)}</p>
                    </div>
                </button>
                <input 
                    ref={dateInputRef}
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                />
            </div>

            {/* Pulse Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    <>
                        {/* Income Card */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm group hover:shadow-xl transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Coins size={24} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 px-3 py-1 rounded-full uppercase tracking-wider">Credits</span>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Daily Revenue</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">{formatCurrency(dailyMetrics.income)}</h3>
                        </div>

                        {/* Expenses Card */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm group hover:shadow-xl transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Receipt size={24} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black text-rose-500 bg-rose-50 dark:bg-rose-900/40 px-3 py-1 rounded-full uppercase tracking-wider">Debits</span>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Daily Bills</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">{formatCurrency(dailyMetrics.expenses)}</h3>
                        </div>

                        {/* Profit Card */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm group hover:shadow-xl transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Wallet size={24} strokeWidth={2.5} />
                                </div>
                                {dailyMetrics.margin !== "0" && (
                                     <span className="flex items-center gap-1 text-[10px] font-black text-primary-500 bg-primary-50 dark:bg-primary-900/40 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {dailyMetrics.margin}% Yield
                                     </span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Net Yield</p>
                            <h3 className={`text-2xl font-black ${dailyMetrics.profit >= 0 ? 'text-gray-900 dark:text-white' : 'text-rose-500'}`}>
                                {formatCurrency(dailyMetrics.profit)}
                            </h3>
                        </div>

                        {/* Staff Card */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm group hover:shadow-xl transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Users size={24} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black text-purple-500 bg-purple-50 dark:bg-purple-900/40 px-3 py-1 rounded-full uppercase tracking-wider">HR Active</span>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Attendance</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                {dailyMetrics.staffPresent} <span className="text-gray-300 text-lg">/ {dailyMetrics.totalStaff}</span>
                            </h3>
                        </div>
                    </>
                )}
            </div>

            {/* Advanced Charts Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {isLoading ? (
                    <>
                        <SkeletonChart />
                        <SkeletonChart />
                    </>
                ) : (
                    <>
                        {/* Flow Chart */}
                        <div className="bg-white dark:bg-gray-800 p-10 rounded-[3.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700 group transition-all">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Revenue Stream</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">6-Month Comparison</p>
                                </div>
                                <div className="flex gap-4">
                                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Credits
                                     </div>
                                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-rose-500">
                                        <span className="h-2 w-2 rounded-full bg-rose-500"></span> Debits
                                     </div>
                                </div>
                            </div>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlySummary}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.05)" />
                                        <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800}} />
                                        <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800}} tickFormatter={(value) => `₹${Number(value)/1000}k`}/>
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(59, 130, 246, 0.02)' }}
                                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontWeight: '900', fontSize: '11px', textTransform: 'uppercase' }}
                                        />
                                        <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} barSize={24} />
                                        <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Profit Growth Chart */}
                        <div className="bg-white dark:bg-gray-800 p-10 rounded-[3.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700 group transition-all">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Growth Velocity</h3>
                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mt-1">7-Day Profitability Index</p>
                                </div>
                                <TrendingUp size={24} className="text-primary-500 opacity-20" />
                            </div>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dailyProfitData}>
                                        <defs>
                                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.05)"/>
                                        <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800}} />
                                        <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800}} tickFormatter={(value) => `₹${Number(value)/1000}k`}/>
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontWeight: '900', fontSize: '11px', textTransform: 'uppercase' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="profit" 
                                            stroke="#3b82f6" 
                                            strokeWidth={6} 
                                            fillOpacity={1} 
                                            fill="url(#colorProfit)"
                                            dot={{ r: 5, fill: '#3b82f6', strokeWidth: 4, stroke: '#fff' }} 
                                            activeDot={{ r: 8, strokeWidth: 0 }} 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
