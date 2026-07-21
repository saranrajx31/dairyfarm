export interface Animal {
  id: string;
  tag_number: string;
  breed: string;
  gender: 'Female' | 'Male';
  age: number; // in years or months
  weight: number; // in kg
  photo?: string;
  health_status: 'Healthy' | 'Sick' | 'Under Treatment' | 'Quarantined';
  purchase_date: string;
  status: 'Active' | 'Sold' | 'Deceased';
  daily_avg_milk?: number;
  last_vaccination?: string;
}

export interface MilkProductionRecord {
  id: string;
  date: string;
  animal_id?: string;
  animal_tag?: string;
  morning_milk: number; // in liters
  evening_milk: number; // in liters
  total_milk: number; // in liters
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  total_orders: number;
  total_spent: number;
  status: 'Active' | 'Inactive';
  created_at: string;
}

export interface Sale {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  product_name: string;
  milk_quantity: number; // liters or kg
  price_per_liter: number;
  total_price: number;
  payment_status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  salary: number;
  attendance_status: 'Present' | 'Absent' | 'On Leave';
  join_date: string;
}

export interface Expense {
  id: string;
  category: 'Feed' | 'Medicine' | 'Electricity' | 'Salary' | 'Transport' | 'Maintenance' | 'Equipment' | 'Other';
  amount: number;
  description: string;
  date: string;
  payment_method: 'Cash' | 'Bank Transfer' | 'Card' | 'UPI';
}

export interface HealthRecord {
  id: string;
  animal_id: string;
  animal_tag: string;
  type: 'Vaccination' | 'Treatment' | 'Routine Checkup' | 'Deworming';
  description: string;
  doctor: string;
  cost: number;
  record_date: string;
  next_due_date: string;
  status: 'Completed' | 'Scheduled' | 'Overdue';
}

export interface BreedingRecord {
  id: string;
  animal_id: string;
  animal_tag: string;
  breeding_date: string;
  pregnancy_status: 'Confirmed' | 'Pending' | 'Not Pregnant' | 'Delivered';
  expected_delivery: string;
  actual_delivery?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  item_name: string;
  category: 'Feed' | 'Medicine' | 'Equipment' | 'Packaging' | 'Supplies';
  quantity: number;
  unit: string;
  reorder_level: number;
  price: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  is_read: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalAnimals: number;
  todaysMilk: number;
  monthlyRevenue: number;
  activeCustomers: number;
  employeesCount: number;
  monthlyExpenses: number;
}

export interface DairyProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  fatContent: string;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
}
