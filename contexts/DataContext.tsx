
/**
 * 🛠️ UPDATED SUPABASE SQL SCHEMA (standard snake_case):
 * 
 * CREATE TABLE income (
 *   id TEXT PRIMARY KEY, 
 *   date DATE NOT NULL, 
 *   source TEXT NOT NULL, 
 *   amount NUMERIC NOT NULL, 
 *   notes TEXT
 * );
 * 
 * CREATE TABLE expenses (
 *   id TEXT PRIMARY KEY, 
 *   date DATE NOT NULL, 
 *   category TEXT NOT NULL, 
 *   amount NUMERIC NOT NULL, 
 *   payment_mode TEXT NOT NULL, 
 *   notes TEXT
 * );
 * 
 * CREATE TABLE staff (
 *   id TEXT PRIMARY KEY, 
 *   name TEXT NOT NULL, 
 *   role TEXT NOT NULL, 
 *   monthly_salary NUMERIC NOT NULL, 
 *   joining_date DATE NOT NULL
 * );
 * 
 * CREATE TABLE attendance (
 *   id TEXT PRIMARY KEY, 
 *   staff_id TEXT REFERENCES staff(id) ON DELETE CASCADE, 
 *   date DATE NOT NULL, 
 *   status TEXT NOT NULL
 * );
 * 
 * CREATE TABLE salary_transactions (
 *   id TEXT PRIMARY KEY, 
 *   staff_id TEXT REFERENCES staff(id) ON DELETE CASCADE, 
 *   date DATE NOT NULL, 
 *   amount NUMERIC NOT NULL, 
 *   type TEXT NOT NULL, 
 *   notes TEXT
 * );
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { IncomeEntry, ExpenseEntry, StaffMember, AttendanceRecord, SalaryTransaction } from '../types';
import { getTodayDateString } from '../utils/helpers';

interface DataContextType {
    income: IncomeEntry[];
    setIncome: React.Dispatch<React.SetStateAction<IncomeEntry[]>>;
    expenses: ExpenseEntry[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseEntry[]>>;
    staff: StaffMember[];
    setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
    attendance: AttendanceRecord[];
    setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
    salaryTransactions: SalaryTransaction[];
    setSalaryTransactions: React.Dispatch<React.SetStateAction<SalaryTransaction[]>>;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    resetToToday: () => void;
    isLoading: boolean;
    isSyncing: boolean;
    syncToCloud: (table: string, data: any) => Promise<boolean>;
    deleteFromCloud: (table: string, id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [income, setIncome] = useState<IncomeEntry[]>([]);
    const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [salaryTransactions, setSalaryTransactions] = useState<SalaryTransaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayDateString());
    
    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [
                    { data: inc },
                    { data: exp },
                    { data: stf },
                    { data: att },
                    { data: sal }
                ] = await Promise.all([
                    supabase.from('income').select('*'),
                    supabase.from('expenses').select('*'),
                    supabase.from('staff').select('*'),
                    supabase.from('attendance').select('*'),
                    supabase.from('salary_transactions').select('*')
                ]);

                if (inc) setIncome(inc);
                if (exp) setExpenses(exp);
                if (stf) setStaff(stf);
                if (att) setAttendance(att);
                if (sal) setSalaryTransactions(sal);
            } catch (error) {
                console.error("Hydration failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const resetToToday = () => setSelectedDate(getTodayDateString());

    const syncToCloud = async (table: string, data: any): Promise<boolean> => {
        setIsSyncing(true);
        try {
            const { error } = await supabase.from(table).upsert(data);
            if (error) {
                console.error(`❌ Sync Failed [${table}]:`, error.message);
                console.debug(`❌ Data was:`, JSON.stringify(data, null, 2));
                setIsSyncing(false);
                return false;
            }
            setIsSyncing(false);
            return true;
        } catch (err) {
            console.error(`❌ Sync Error:`, err);
            setIsSyncing(false);
            return false;
        }
    };

    const deleteFromCloud = async (table: string, id: string) => {
        setIsSyncing(true);
        await supabase.from(table).delete().eq('id', id);
        setIsSyncing(false);
    };

    const value = {
        income, setIncome,
        expenses, setExpenses,
        staff, setStaff,
        attendance, setAttendance,
        salaryTransactions, setSalaryTransactions,
        selectedDate, setSelectedDate,
        resetToToday,
        isLoading,
        isSyncing,
        syncToCloud,
        deleteFromCloud
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};
