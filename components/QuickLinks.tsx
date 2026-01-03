
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Coins, Receipt, Users, BarChart, LayoutDashboard } from 'lucide-react';

const QuickLinks: React.FC = () => {
    const location = useLocation();

    const links = [
        { path: '/', icon: LayoutDashboard, label: 'Dash' },
        { path: '/income', icon: Coins, label: 'Income' },
        { path: '/expenses', icon: Receipt, label: 'Bills' },
        { path: '/staff', icon: Users, label: 'Staff' },
        { path: '/reports', icon: BarChart, label: 'Audit' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4">
            <nav className="flex items-center gap-1.5 p-2.5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl border border-gray-200/40 dark:border-gray-700/40 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 animate-in slide-in-from-bottom-12 duration-1000">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={`flex flex-col items-center justify-center gap-1 px-5 sm:px-7 py-3 rounded-[2.5rem] transition-all duration-500 group relative ${
                                isActive 
                                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/30 active:scale-95' 
                                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                            }`}
                        >
                            <Icon 
                                size={19} 
                                strokeWidth={isActive ? 2.5 : 2}
                                className={`transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}`} 
                            />
                            <span className={`text-[8.5px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 scale-90 hidden sm:block group-hover:opacity-100 group-hover:scale-100'}`}>
                                {link.label}
                            </span>
                            {isActive && (
                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default QuickLinks;
