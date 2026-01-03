
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Login from './pages/Login';
import StaffDetail from './pages/StaffDetail';
import QuickLinks from './components/QuickLinks';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('isAuthenticated'));

    const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    };

    if (!isAuthenticated) {
        return (
            <ThemeProvider>
                 <div className="min-h-screen bg-gray-950">
                    <HashRouter>
                        <Routes>
                            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </HashRouter>
                 </div>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider>
            <DataProvider>
                <HashRouter>
                    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200 selection:bg-primary-500 selection:text-white">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full pb-32">
                            <Routes>
                                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
                                <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
                                <Route path="/staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
                                <Route path="/staff/:id" element={<PrivateRoute><StaffDetail /></PrivateRoute>} />
                                <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>

                            <footer className="mt-20 py-12 text-center border-t border-white/5">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-2">
                                    HotelPro Enterprise Operations Management &copy; 2025
                                </p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Created by <span className="text-primary-500">infas.mk</span> || Web ⚡ Bits
                                </p>
                            </footer>
                        </main>
                        <QuickLinks />
                    </div>
                </HashRouter>
            </DataProvider>
        </ThemeProvider>
    );
};

export default App;
