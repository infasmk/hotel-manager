
export enum IncomeSource {
    ROOM_RENT = 'Room Rent',
    RESTAURANT = 'Restaurant',
    EXTRA_SERVICES = 'Extra Services',
    OTHER = 'Other'
}

export enum ExpenseCategory {
    FOOD = 'Food & Groceries',
    ELECTRICITY = 'Electricity Bill',
    MAINTENANCE = 'Maintenance',
    SALARY = 'Staff Salary',
    MISCELLANEOUS = 'Miscellaneous'
}

export enum PaymentMode {
    CASH = 'Cash',
    ONLINE = 'Online'
}

export enum StaffRole {
    RECEPTIONIST = 'Receptionist',
    COOK = 'Cook',
    CLEANER = 'Cleaner',
    MANAGER = 'Manager',
    SECURITY = 'Security'
}

export enum AttendanceStatus {
    PRESENT = 'Present',
    ABSENT = 'Absent'
}

export interface IncomeEntry {
    id: string;
    date: string;
    source: IncomeSource;
    amount: number;
    notes?: string;
}

export interface ExpenseEntry {
    id: string;
    date: string;
    category: ExpenseCategory;
    amount: number;
    payment_mode: PaymentMode; // Renamed from paymentMode
    notes?: string;
}

export interface StaffMember {
    id: string;
    name: string;
    role: StaffRole;
    monthly_salary: number; // Renamed from monthlySalary
    joining_date: string; // Renamed from joiningDate
}

export interface AttendanceRecord {
    id: string;
    staff_id: string; // Renamed from staffId
    date: string;
    status: AttendanceStatus;
}

export enum SalaryTransactionType {
    SALARY = 'Salary',
    ADVANCE = 'Advance'
}

export interface SalaryTransaction {
    id: string;
    staff_id: string; // Renamed from staffId
    date: string;
    amount: number;
    type: SalaryTransactionType;
    notes?: string;
}
