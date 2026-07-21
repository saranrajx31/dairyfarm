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
  DairyProduct,
  DashboardStats,
} from '../types';

export const initialDashboardStats: DashboardStats = {
  totalAnimals: 214,
  todaysMilk: 548.5,
  monthlyRevenue: 1284500, // ₹12,84,500
  activeCustomers: 1042,
  employeesCount: 25,
  monthlyExpenses: 462000, // ₹4,62,000
};

export const initialAnimals: Animal[] = [
  {
    id: 'cow-101',
    tag_number: 'COW-001',
    breed: 'Gir (Desi A2)',
    gender: 'Female',
    age: 4.5,
    weight: 420,
    photo: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80',
    health_status: 'Healthy',
    purchase_date: '2023-01-15',
    status: 'Active',
    daily_avg_milk: 18.5,
    last_vaccination: '2026-05-10',
  },
  {
    id: 'cow-102',
    tag_number: 'COW-002',
    breed: 'Sahiwal',
    gender: 'Female',
    age: 3.2,
    weight: 390,
    photo: 'https://images.unsplash.com/photo-1570042702808-5858853f6053?auto=format&fit=crop&w=600&q=80',
    health_status: 'Healthy',
    purchase_date: '2023-04-20',
    status: 'Active',
    daily_avg_milk: 16.0,
    last_vaccination: '2026-06-01',
  },
  {
    id: 'cow-103',
    tag_number: 'COW-003',
    breed: 'Murrah Buffalo',
    gender: 'Female',
    age: 5.0,
    weight: 550,
    photo: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    health_status: 'Healthy',
    purchase_date: '2022-11-05',
    status: 'Active',
    daily_avg_milk: 22.5,
    last_vaccination: '2026-04-18',
  },
  {
    id: 'cow-104',
    tag_number: 'COW-004',
    breed: 'Red Sindhi',
    gender: 'Female',
    age: 2.8,
    weight: 360,
    photo: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80',
    health_status: 'Under Treatment',
    purchase_date: '2024-02-10',
    status: 'Active',
    daily_avg_milk: 14.0,
    last_vaccination: '2026-03-12',
  },
  {
    id: 'cow-105',
    tag_number: 'COW-005',
    breed: 'Tharparkar',
    gender: 'Female',
    age: 4.1,
    weight: 410,
    photo: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80',
    health_status: 'Healthy',
    purchase_date: '2023-08-14',
    status: 'Active',
    daily_avg_milk: 15.0,
    last_vaccination: '2026-06-15',
  },
  {
    id: 'cow-106',
    tag_number: 'COW-006',
    breed: 'Holstein Friesian Cross',
    gender: 'Female',
    age: 3.8,
    weight: 580,
    photo: 'https://images.unsplash.com/photo-1570042702808-5858853f6053?auto=format&fit=crop&w=600&q=80',
    health_status: 'Sick',
    purchase_date: '2023-09-01',
    status: 'Active',
    daily_avg_milk: 24.0,
    last_vaccination: '2026-01-20',
  },
];

export const initialMilkRecords: MilkProductionRecord[] = [
  { id: 'm-1', date: '2026-07-21', morning_milk: 285.5, evening_milk: 263.0, total_milk: 548.5, notes: 'Peak morning yield' },
  { id: 'm-2', date: '2026-07-20', morning_milk: 278.0, evening_milk: 255.0, total_milk: 533.0, notes: 'Good climate condition' },
  { id: 'm-3', date: '2026-07-19', morning_milk: 290.0, evening_milk: 260.5, total_milk: 550.5, notes: 'Fresh green fodder fed' },
  { id: 'm-4', date: '2026-07-18', morning_milk: 275.0, evening_milk: 248.0, total_milk: 523.0, notes: 'Routine vet checkup day' },
  { id: 'm-5', date: '2026-07-17', morning_milk: 282.0, evening_milk: 258.0, total_milk: 540.0, notes: 'Standard yield' },
  { id: 'm-6', date: '2026-07-16', morning_milk: 270.0, evening_milk: 250.0, total_milk: 520.0, notes: 'Monsoon rainfall' },
  { id: 'm-7', date: '2026-07-15', morning_milk: 288.0, evening_milk: 265.0, total_milk: 553.0, notes: 'Optimal nutrition ratio' },
];

export const initialCustomers: Customer[] = [
  { id: 'c-1', name: 'Krishna Sweets & Foods', phone: '+91 98765 43210', email: 'orders@krishnasweets.in', address: '124 MG Road, Bengaluru, Karnataka', total_orders: 48, total_spent: 384000, status: 'Active', created_at: '2024-01-10' },
  { id: 'c-2', name: 'Annapoorna Dairy & Bakery', phone: '+91 98450 12345', email: 'purchases@annapoorna.co.in', address: '89 Commercial Street, Mysuru', total_orders: 62, total_spent: 512000, status: 'Active', created_at: '2023-11-15' },
  { id: 'c-3', name: 'Rajesh Kumar (Organic Mart)', phone: '+91 97312 89012', email: 'rajesh.k@gmail.com', address: '45 Indiranagar, 10th Main, Bengaluru', total_orders: 14, total_spent: 45000, status: 'Active', created_at: '2024-03-22' },
  { id: 'c-4', name: 'Mother Dairy Local Retailer', phone: '+91 99001 56789', email: 'retailer.bengaluru@motherdairy.com', address: '500 Ring Road, Rajajinagar', total_orders: 35, total_spent: 680000, status: 'Active', created_at: '2023-08-05' },
  { id: 'c-5', name: 'Priya Sharma (Apartments Society)', phone: '+91 98860 77889', email: 'priya.sharma@yahoo.co.in', address: 'Flat 402, Green Acres, Whitefield', total_orders: 9, total_spent: 18500, status: 'Active', created_at: '2024-05-18' },
];

export const initialSales: Sale[] = [
  { id: 's-101', invoice_number: 'INV-2026-089', customer_id: 'c-1', customer_name: 'Krishna Sweets & Foods', product_name: 'Desi A2 Cow Milk', milk_quantity: 200, price_per_liter: 65, total_price: 13000, payment_status: 'Paid', date: '2026-07-21' },
  { id: 's-102', invoice_number: 'INV-2026-090', customer_id: 'c-2', customer_name: 'Annapoorna Dairy & Bakery', product_name: 'Pure Desi Cow Butter', milk_quantity: 50, price_per_liter: 350, total_price: 17500, payment_status: 'Paid', date: '2026-07-20' },
  { id: 's-103', invoice_number: 'INV-2026-091', customer_id: 'c-4', customer_name: 'Mother Dairy Local Retailer', product_name: 'Vedic Bilona Ghee & Paneer', milk_quantity: 350, price_per_liter: 120, total_price: 42000, payment_status: 'Pending', date: '2026-07-20' },
  { id: 's-104', invoice_number: 'INV-2026-092', customer_id: 'c-3', customer_name: 'Rajesh Kumar (Organic Mart)', product_name: 'A2 Fresh Farm Milk', milk_quantity: 40, price_per_liter: 70, total_price: 2800, payment_status: 'Paid', date: '2026-07-19' },
  { id: 's-105', invoice_number: 'INV-2026-093', customer_id: 'c-5', customer_name: 'Priya Sharma (Apartments Society)', product_name: 'Organic Curd & Malai Paneer', milk_quantity: 25, price_per_liter: 90, total_price: 2250, payment_status: 'Overdue', date: '2026-07-10' },
];

export const initialEmployees: Employee[] = [
  { id: 'emp-1', name: 'Dr. Ramesh Rao', role: 'Chief Veterinarian', phone: '+91 98440 11223', salary: 65000, attendance_status: 'Present', join_date: '2022-03-01' },
  { id: 'emp-2', name: 'Suresh Gowda', role: 'Farm Operations Manager', phone: '+91 98451 22334', salary: 45000, attendance_status: 'Present', join_date: '2021-06-15' },
  { id: 'emp-3', name: 'Venkat Swamy', role: 'Milking Supervisor', phone: '+91 98462 33445', salary: 28000, attendance_status: 'Present', join_date: '2023-01-10' },
  { id: 'emp-4', name: 'Lakshmi Devi', role: 'Quality Assurance Lead', phone: '+91 98473 44556', salary: 32000, attendance_status: 'On Leave', join_date: '2023-09-20' },
  { id: 'emp-5', name: 'Manjunath B.', role: 'Feed & Cattle Specialist', phone: '+91 98484 55667', salary: 25000, attendance_status: 'Present', join_date: '2024-02-01' },
];

export const initialExpenses: Expense[] = [
  { id: 'exp-1', category: 'Feed', amount: 185000, description: 'Green Fodder, Cattle Feed Concentrate & Mineral Mixture', date: '2026-07-18', payment_method: 'Bank Transfer' },
  { id: 'exp-2', category: 'Medicine', amount: 35000, description: 'FMD Vaccination Batch & Udder Health Supplements', date: '2026-07-15', payment_method: 'UPI' },
  { id: 'exp-3', category: 'Electricity', amount: 48000, description: 'Bulk Milk Chiller (BMC) & Milking Machine Power', date: '2026-07-05', payment_method: 'Bank Transfer' },
  { id: 'exp-4', category: 'Maintenance', amount: 18500, description: 'Automated Milking Machine Servicing & Filter Change', date: '2026-07-12', payment_method: 'UPI' },
  { id: 'exp-5', category: 'Transport', amount: 24000, description: 'Refrigerated Delivery Vehicle Fuel & Toll Charges', date: '2026-07-19', payment_method: 'Cash' },
];

export const initialHealthRecords: HealthRecord[] = [
  { id: 'h-1', animal_id: 'cow-101', animal_tag: 'COW-001', type: 'Vaccination', description: 'Foot & Mouth Disease (FMD) Booster', doctor: 'Dr. Ramesh Rao', cost: 1200, record_date: '2026-05-10', next_due_date: '2026-11-10', status: 'Completed' },
  { id: 'h-2', animal_id: 'cow-104', animal_tag: 'COW-004', type: 'Treatment', description: 'Mastitis Care & Antibiotic Therapy', doctor: 'Dr. Ramesh Rao', cost: 3500, record_date: '2026-07-19', next_due_date: '2026-07-25', status: 'Scheduled' },
  { id: 'h-3', animal_id: 'cow-106', animal_tag: 'COW-006', type: 'Routine Checkup', description: 'Metabolic & Calcium Blood Panel', doctor: 'Dr. Ramesh Rao', cost: 2200, record_date: '2026-07-20', next_due_date: '2026-07-27', status: 'Scheduled' },
  { id: 'h-4', animal_id: 'cow-102', animal_tag: 'COW-002', type: 'Deworming', description: 'Quarterly Deworming Oral Drench', doctor: 'Dr. Ramesh Rao', cost: 800, record_date: '2026-06-01', next_due_date: '2026-09-01', status: 'Completed' },
];

export const initialBreedingRecords: BreedingRecord[] = [
  { id: 'b-1', animal_id: 'cow-101', animal_tag: 'COW-001', breeding_date: '2025-10-15', pregnancy_status: 'Confirmed', expected_delivery: '2026-07-25', notes: 'Healthy calf development confirmed via ultrasound.' },
  { id: 'b-2', animal_id: 'cow-103', animal_tag: 'COW-003', breeding_date: '2026-01-10', pregnancy_status: 'Confirmed', expected_delivery: '2026-10-18', notes: 'Second lactation cycle Murrah buffalo.' },
  { id: 'b-3', animal_id: 'cow-105', animal_tag: 'COW-005', breeding_date: '2026-05-02', pregnancy_status: 'Pending', expected_delivery: '2027-02-08', notes: 'Artificial insemination (AI) done with pedigree Gir bull semen.' },
];

export const initialInventory: InventoryItem[] = [
  { id: 'inv-1', item_name: 'Organic Green Clover Fodder', category: 'Feed', quantity: 4500, unit: 'kg', reorder_level: 1000, price: 12 },
  { id: 'inv-2', item_name: 'High-Protein Grain Concentrate', category: 'Feed', quantity: 1800, unit: 'kg', reorder_level: 500, price: 35 },
  { id: 'inv-3', item_name: 'Teat Dip Sanitizer Solution', category: 'Supplies', quantity: 120, unit: 'Liters', reorder_level: 30, price: 450 },
  { id: 'inv-4', item_name: 'Glass Milk Bottles (1L)', category: 'Packaging', quantity: 3500, unit: 'Units', reorder_level: 800, price: 18 },
  { id: 'inv-5', item_name: 'Calcium & Mineral Mix Packs', category: 'Medicine', quantity: 85, unit: 'Packs', reorder_level: 20, price: 850 },
];

export const initialNotifications: NotificationItem[] = [
  { id: 'n-1', title: 'Upcoming Vaccination', message: 'COW-004 Mastitis follow-up scheduled for July 25.', type: 'warning', is_read: false, created_at: '10 mins ago' },
  { id: 'n-2', title: 'Calving Alert', message: 'COW-001 expected calving due date in 4 days.', type: 'info', is_read: false, created_at: '1 hour ago' },
  { id: 'n-3', title: 'Peak Milk Yield', message: 'Today morning yield hit 285.5 L (Peak record)!', type: 'success', is_read: true, created_at: '5 hours ago' },
  { id: 'n-4', title: 'Low Feed Alert', message: 'High-Protein Grain Concentrate approaching reorder level.', type: 'alert', is_read: true, created_at: '1 day ago' },
];

export const dairyProducts: DairyProduct[] = [
  {
    id: 'p-1',
    name: 'Raw A2 Gir Cow Milk',
    category: 'Milk',
    price: 65,
    unit: '1 Liter Bottle',
    fatContent: '4.5% Fat',
    description: '100% pure, unpasteurized A2 milk collected fresh every morning from grass-fed Gir cows.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 'p-2',
    name: 'Desi Cow Cultured Butter (Makhan)',
    category: 'Butter',
    price: 320,
    unit: '500g Pack',
    fatContent: '82% Milk Fat',
    description: 'Slow-churned traditional white butter made from cultured sweet curd and rock salt.',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    badge: 'Artisanal',
    inStock: true,
  },
  {
    id: 'p-3',
    name: 'Vedic Bilona Cow Ghee',
    category: 'Ghee',
    price: 850,
    unit: '500 ml Glass Jar',
    fatContent: '100% Clarified Butter',
    description: 'Traditional 5-stage bilona method golden clarified ghee with rich aromatic granules.',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
    badge: 'Premium Bilona',
    inStock: true,
  },
  {
    id: 'p-4',
    name: 'Organic Probiotic Set Dahi (Curd)',
    category: 'Curd',
    price: 70,
    unit: '1 kg Pot',
    fatContent: '4.0% Fat',
    description: 'Thick, creamy set dahi prepared using natural active probiotic cultures for gut wellness.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    badge: 'Organic',
    inStock: true,
  },
  {
    id: 'p-5',
    name: 'Fresh Malai Paneer',
    category: 'Paneer',
    price: 180,
    unit: '400g Pack',
    fatContent: 'High Protein',
    description: 'Ultra-soft, melt-in-mouth cottage cheese pressed fresh daily without any preservatives.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh Daily',
    inStock: true,
  },
  {
    id: 'p-6',
    name: 'Murrah Buffalo Pure Milk',
    category: 'Milk',
    price: 75,
    unit: '1 Liter Bottle',
    fatContent: '7.2% High Fat',
    description: 'Rich, thick creamy buffalo milk ideal for tea, coffee, kheer, and traditional sweets.',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    badge: 'High Cream',
    inStock: true,
  },
  {
    id: 'p-7',
    name: 'Traditional Sweet Lassi',
    category: 'Yogurt',
    price: 45,
    unit: '350 ml Bottle',
    fatContent: 'Refreshing Drink',
    description: 'Churned yogurt drink blended with cardamom, saffron strands, and crushed pistachios.',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    badge: 'Summer Special',
    inStock: true,
  },
  {
    id: 'p-8',
    name: 'Fresh Dairy Malai (Cream)',
    category: 'Cream',
    price: 160,
    unit: '350 g Container',
    fatContent: '45% Milk Fat',
    description: 'Silky rich thick fresh cream perfect for Indian curries, desserts, and whipping.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    badge: 'Chef Favorite',
    inStock: true,
  },
];

export const monthlyMilkYieldData = [
  { month: 'Jan', yield: 14200, sales: 923000 },
  { month: 'Feb', yield: 13800, sales: 897000 },
  { month: 'Mar', yield: 15500, sales: 1007500 },
  { month: 'Apr', yield: 16200, sales: 1053000 },
  { month: 'May', yield: 15900, sales: 1033500 },
  { month: 'Jun', yield: 16800, sales: 1092000 },
  { month: 'Jul', yield: 17200, sales: 1284500 },
];

export const monthlyExpensesData = [
  { category: 'Feed', amount: 185000, color: '#0D8F87' },
  { category: 'Salary', amount: 195000, color: '#18B6A6' },
  { category: 'Electricity', amount: 48000, color: '#F7C948' },
  { category: 'Medicine', amount: 35000, color: '#EF4444' },
  { category: 'Maintenance', amount: 18500, color: '#8B5CF6' },
  { category: 'Transport', amount: 24000, color: '#F59E0B' },
];
