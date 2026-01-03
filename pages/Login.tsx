
import React, { useState } from 'react';
import { Hotel, Lock, ShieldCheck, User, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulating realistic authentication delay
        setTimeout(() => {
            if (password === 'infas1313') {
                setError('');
                sessionStorage.setItem('isAuthenticated', 'true');
                onLogin();
            } else {
                setError('Authentication failed. Please check your access key.');
                setIsLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 p-4 md:p-8 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] delay-1000 animate-pulse"></div>
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-800 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700">
                
                {/* Visual Left Panel */}
                <div className="hidden md:flex md:w-5/12 bg-primary-600 p-12 text-white flex-col justify-between relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center"></div>
                    
                    <div className="relative z-10">
                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-8 shadow-inner">
                            <Hotel className="h-8 w-8 text-white" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
                            Hotel<span className="opacity-70">Pro</span>
                        </h1>
                        <p className="text-sm font-bold opacity-80 uppercase tracking-[0.2em]">Management Suite v2.5</p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-8 bg-white rounded-full"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Security</span>
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Unified hospitality operations & financial oversight.</h2>
                        </div>
                        <div className="flex -space-x-3 overflow-hidden">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-primary-600 object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                            ))}
                            <div className="flex items-center justify-center h-10 w-10 rounded-full ring-4 ring-primary-600 bg-primary-500 text-[10px] font-black">+12</div>
                        </div>
                        <p className="text-xs font-medium opacity-60">Trusted by 500+ luxury properties worldwide.</p>
                    </div>
                </div>

                {/* Login Form Right Panel */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <div className="mb-10 text-center md:text-left">
                        <div className="md:hidden flex justify-center mb-6">
                            <div className="p-3 bg-primary-600 rounded-2xl shadow-xl shadow-primary-600/20">
                                <Hotel className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Internal Access</h2>
                        <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Secure Manager Gateway</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <div className="relative group">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Identity</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                        <User size={18} strokeWidth={2.5} />
                                    </div>
                                    <input
                                        type="text"
                                        disabled
                                        value="System Administrator"
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl text-sm font-black text-gray-400 dark:text-gray-500 cursor-not-allowed uppercase tracking-wider shadow-inner"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Access Key</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                        <Lock size={18} strokeWidth={2.5} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        autoFocus
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full pl-14 pr-14 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 rounded-2xl text-sm font-black text-gray-900 dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 ${error ? 'border-rose-500/50 bg-rose-50/50 dark:bg-rose-900/10' : ''}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl animate-shake">
                                <ShieldCheck className="text-rose-600" size={18} />
                                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full overflow-hidden rounded-2xl bg-primary-600 px-8 py-5 text-center transition-all hover:bg-primary-700 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-2xl shadow-primary-600/30"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                {isLoading ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Verifying Identity...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Enter Dashboard</span>
                                        <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/10 to-transparent transition-transform group-hover:translate-y-0"></div>
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center md:text-left">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                                    &copy; 2025 HotelPro Global Systems
                                </p>
                                <p className="text-[8px] font-black text-gray-200 dark:text-gray-700 uppercase tracking-[0.25em] pt-1">
                                    Created by infas.mk || Web ⚡ Bits
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a href="#" className="text-[9px] font-black text-gray-400 hover:text-primary-500 uppercase tracking-widest transition-colors">Privacy Policy</a>
                                <a href="#" className="text-[9px] font-black text-gray-400 hover:text-primary-500 uppercase tracking-widest transition-colors">Legal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
