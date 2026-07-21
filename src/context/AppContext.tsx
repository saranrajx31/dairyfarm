import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Animal,
  MilkProductionRecord,
  Customer,
  Sale,
  Employee,
  Expense,
  HealthRecord,
  BreedingRecord,
  InventoryItem,
  NotificationItem,
  DashboardStats,
} from '../types';
import {
  initialDashboardStats,
  initialAnimals,
  initialMilkRecords,
  initialCustomers,
  initialSales,
  initialEmployees,
  initialExpenses,
  initialHealthRecords,
  initialBreedingRecords,
  initialInventory,
  initialNotifications,
} from '../lib/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  // Theme & Layout
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;

  // Data Collections
  stats: DashboardStats;
  animals: Animal[];
  milkRecords: MilkProductionRecord[];
  customers: Customer[];
  sales: Sale[];
  employees: Employee[];
  expenses: Expense[];
  healthRecords: HealthRecord[];
  breedingRecords: BreedingRecord[];
  inventory: InventoryItem[];
  notifications: NotificationItem[];

  // Mutators
  addAnimal: (animal: Omit<Animal, 'id'>) => void;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;

  addMilkRecord: (record: Omit<MilkProductionRecord, 'id' | 'total_milk'>) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'total_orders' | 'total_spent' | 'created_at'>) => void;
  addSale: (sale: Omit<Sale, 'id' | 'invoice_number' | 'total_price'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  addBreedingRecord: (record: Omit<BreedingRecord, 'id'>) => void;
  markNotificationRead: (id: string) => void;

  // Toast System
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  // State entities
  const [stats, setStats] = useState<DashboardStats>(initialDashboardStats);
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [milkRecords, setMilkRecords] = useState<MilkProductionRecord[]>(initialMilkRecords);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(initialHealthRecords);
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[]>(initialBreedingRecords);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Toast messages
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync Dark Mode with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // CRUD Actions
  const addAnimal = (animalData: Omit<Animal, 'id'>) => {
    const newAnimal: Animal = {
      ...animalData,
      id: `cow-${Date.now()}`,
    };
    setAnimals((prev) => [newAnimal, ...prev]);
    setStats((prev) => ({ ...prev, totalAnimals: prev.totalAnimals + 1 }));
    showToast(`Animal ${newAnimal.tag_number} added successfully!`, 'success');
  };

  const updateAnimal = (id: string, updatedFields: Partial<Animal>) => {
    setAnimals((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a)));
    showToast('Animal record updated', 'info');
  };

  const deleteAnimal = (id: string) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
    setStats((prev) => ({ ...prev, totalAnimals: Math.max(0, prev.totalAnimals - 1) }));
    showToast('Animal record deleted', 'info');
  };

  const addMilkRecord = (record: Omit<MilkProductionRecord, 'id' | 'total_milk'>) => {
    const total_milk = Number(record.morning_milk) + Number(record.evening_milk);
    const newRecord: MilkProductionRecord = {
      ...record,
      id: `m-${Date.now()}`,
      total_milk,
    };
    setMilkRecords((prev) => [newRecord, ...prev]);
    setStats((prev) => ({ ...prev, todaysMilk: total_milk }));
    showToast(`Recorded ${total_milk} Liters of milk for ${record.date}`, 'success');
  };

  const addCustomer = (custData: Omit<Customer, 'id' | 'total_orders' | 'total_spent' | 'created_at'>) => {
    const newCustomer: Customer = {
      ...custData,
      id: `c-${Date.now()}`,
      total_orders: 0,
      total_spent: 0,
      status: 'Active',
      created_at: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setStats((prev) => ({ ...prev, activeCustomers: prev.activeCustomers + 1 }));
    showToast(`Customer ${newCustomer.name} added!`, 'success');
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'invoice_number' | 'total_price'>) => {
    const total_price = Number(saleData.milk_quantity) * Number(saleData.price_per_liter);
    const invNum = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newSale: Sale = {
      ...saleData,
      id: `s-${Date.now()}`,
      invoice_number: invNum,
      total_price,
    };
    setSales((prev) => [newSale, ...prev]);
    setStats((prev) => ({ ...prev, monthlyRevenue: prev.monthlyRevenue + total_price }));
    showToast(`Sale recorded! Invoice ${invNum}`, 'success');
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setStats((prev) => ({ ...prev, monthlyExpenses: prev.monthlyExpenses + expenseData.amount }));
    showToast(`Expense of $${expenseData.amount} added`, 'info');
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: `h-${Date.now()}`,
    };
    setHealthRecords((prev) => [newRecord, ...prev]);
    showToast(`Health record for ${record.animal_tag} logged`, 'success');
  };

  const addBreedingRecord = (record: Omit<BreedingRecord, 'id'>) => {
    const newRecord: BreedingRecord = {
      ...record,
      id: `b-${Date.now()}`,
    };
    setBreedingRecords((prev) => [newRecord, ...prev]);
    showToast(`Breeding log created for ${record.animal_tag}`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        currentView,
        setCurrentView,

        stats,
        animals,
        milkRecords,
        customers,
        sales,
        employees,
        expenses,
        healthRecords,
        breedingRecords,
        inventory,
        notifications,

        addAnimal,
        updateAnimal,
        deleteAnimal,
        addMilkRecord,
        addCustomer,
        addSale,
        addExpense,
        addHealthRecord,
        addBreedingRecord,
        markNotificationRead,

        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
