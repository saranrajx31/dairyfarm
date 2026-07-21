-- ========================================================
-- DAIRY FARM MANAGEMENT SYSTEM - COMPLETE SUPABASE SCHEMA & SEED DATA
-- Currency: Indian Rupee (₹ / INR)
-- Demo Accounts: admin@dairyfarm.com | manager@dairyfarm.com
-- ========================================================

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------
-- 1. PROFILES TABLE (USER ACCOUNTS)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'Manager' CHECK (role IN ('Admin', 'Manager', 'Veterinarian', 'Staff')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 2. ANIMALS TABLE (LIVESTOCK DATA)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.animals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag_number VARCHAR(50) UNIQUE NOT NULL,
    breed VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Female', 'Male')) DEFAULT 'Female',
    age NUMERIC(4, 1) NOT NULL,
    weight NUMERIC(6, 2) NOT NULL,
    photo TEXT,
    health_status VARCHAR(50) DEFAULT 'Healthy' CHECK (health_status IN ('Healthy', 'Sick', 'Under Treatment', 'Quarantined')),
    purchase_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Sold', 'Deceased')),
    daily_avg_milk NUMERIC(5, 2) DEFAULT 0,
    last_vaccination DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 3. MILK PRODUCTION TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.milk_production (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    animal_id UUID REFERENCES public.animals(id) ON DELETE SET NULL,
    morning_milk NUMERIC(6, 2) NOT NULL DEFAULT 0,
    evening_milk NUMERIC(6, 2) NOT NULL DEFAULT 0,
    total_milk NUMERIC(6, 2) GENERATED ALWAYS AS (morning_milk + evening_milk) STORED,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 4. CUSTOMERS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100),
    address TEXT NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_spent NUMERIC(12, 2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 5. SALES & INVOICES TABLE (IN INR ₹)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    milk_quantity NUMERIC(8, 2) NOT NULL,
    price_per_liter NUMERIC(8, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'Paid' CHECK (payment_status IN ('Paid', 'Pending', 'Overdue')),
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 6. EMPLOYEES TABLE (SALARY IN INR ₹)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    salary NUMERIC(12, 2) NOT NULL,
    attendance_status VARCHAR(20) DEFAULT 'Present' CHECK (attendance_status IN ('Present', 'Absent', 'On Leave')),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 7. EXPENSES TABLE (AMOUNT IN INR ₹)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Feed', 'Medicine', 'Electricity', 'Salary', 'Transport', 'Maintenance', 'Equipment', 'Other')),
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(30) DEFAULT 'Cash' CHECK (payment_method IN ('Cash', 'Bank Transfer', 'Card', 'UPI')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 8. HEALTH RECORDS TABLE (COST IN INR ₹)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    animal_tag VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Vaccination', 'Treatment', 'Routine Checkup', 'Deworming', 'Surgery')),
    description TEXT NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    cost NUMERIC(10, 2) DEFAULT 0,
    record_date DATE DEFAULT CURRENT_DATE,
    next_due_date DATE,
    status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Scheduled', 'Pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 9. BREEDING RECORDS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.breeding_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    animal_tag VARCHAR(50) NOT NULL,
    breeding_date DATE NOT NULL,
    pregnancy_status VARCHAR(30) DEFAULT 'Pending' CHECK (pregnancy_status IN ('Confirmed', 'Pending', 'Failed', 'Delivered')),
    expected_delivery DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milk_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breeding_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Animals" ON public.animals FOR SELECT USING (true);
CREATE POLICY "Public Write Animals" ON public.animals FOR ALL USING (true);

CREATE POLICY "Public Read Milk" ON public.milk_production FOR SELECT USING (true);
CREATE POLICY "Public Write Milk" ON public.milk_production FOR ALL USING (true);

CREATE POLICY "Public Read Customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Public Write Customers" ON public.customers FOR ALL USING (true);

CREATE POLICY "Public Read Sales" ON public.sales FOR SELECT USING (true);
CREATE POLICY "Public Write Sales" ON public.sales FOR ALL USING (true);

CREATE POLICY "Public Read Employees" ON public.employees FOR SELECT USING (true);
CREATE POLICY "Public Write Employees" ON public.employees FOR ALL USING (true);

CREATE POLICY "Public Read Expenses" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Public Write Expenses" ON public.expenses FOR ALL USING (true);

CREATE POLICY "Public Read Health" ON public.health_records FOR SELECT USING (true);
CREATE POLICY "Public Write Health" ON public.health_records FOR ALL USING (true);

CREATE POLICY "Public Read Breeding" ON public.breeding_records FOR SELECT USING (true);
CREATE POLICY "Public Write Breeding" ON public.breeding_records FOR ALL USING (true);

CREATE POLICY "Public Profiles Read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Profiles Write" ON public.profiles FOR ALL USING (true);

-- ========================================================
-- DEMO USER ACCOUNTS IN AUTH.USERS (Password: password123)
-- ========================================================

-- Insert Admin User into auth.users if not exists
INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
    'authenticated',
    'authenticated',
    'admin@dairyfarm.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Rajesh Sharma","role":"Admin"}',
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Manager User into auth.users if not exists
INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
    'authenticated',
    'authenticated',
    'manager@dairyfarm.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Priya Gowda","role":"Manager"}',
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert into public.profiles
INSERT INTO public.profiles (id, email, full_name, role)
VALUES 
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'admin@dairyfarm.com', 'Rajesh Sharma', 'Admin'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'manager@dairyfarm.com', 'Priya Gowda', 'Manager')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;

-- ========================================================
-- SEED DATA (INDIAN RUPEE ₹ AND INDIAN DAIRY RECORDS)
-- ========================================================

-- Insert Sample Animals
INSERT INTO public.animals (tag_number, breed, gender, age, weight, photo, health_status, purchase_date, status, daily_avg_milk, last_vaccination)
VALUES
('COW-001', 'Gir (Desi A2)', 'Female', 4.5, 420.0, 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80', 'Healthy', '2023-01-15', 'Active', 18.5, '2026-05-10'),
('COW-002', 'Sahiwal', 'Female', 3.2, 390.0, 'https://images.unsplash.com/photo-1570042702808-5858853f6053?auto=format&fit=crop&w=600&q=80', 'Healthy', '2023-04-20', 'Active', 16.0, '2026-06-01'),
('COW-003', 'Murrah Buffalo', 'Female', 5.0, 550.0, 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80', 'Healthy', '2022-11-05', 'Active', 22.5, '2026-04-18'),
('COW-004', 'Red Sindhi', 'Female', 2.8, 360.0, 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80', 'Under Treatment', '2024-02-10', 'Active', 14.0, '2026-03-12'),
('COW-005', 'Tharparkar', 'Female', 4.1, 410.0, 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80', 'Healthy', '2023-08-14', 'Active', 15.0, '2026-06-15')
ON CONFLICT (tag_number) DO NOTHING;

-- Insert Sample Milk Production Records
INSERT INTO public.milk_production (date, morning_milk, evening_milk, notes)
VALUES
(CURRENT_DATE, 285.50, 263.00, 'Peak morning yield recorded'),
(CURRENT_DATE - INTERVAL '1 day', 278.00, 255.00, 'Good climate condition'),
(CURRENT_DATE - INTERVAL '2 days', 290.00, 260.50, 'Fresh green fodder fed'),
(CURRENT_DATE - INTERVAL '3 days', 275.00, 248.00, 'Routine vet checkup day'),
(CURRENT_DATE - INTERVAL '4 days', 282.00, 258.00, 'Standard yield');

-- Insert Sample Customers
INSERT INTO public.customers (name, phone, email, address, total_orders, total_spent, status)
VALUES
('Krishna Sweets & Foods', '+91 98765 43210', 'orders@krishnasweets.in', '124 MG Road, Bengaluru, Karnataka', 48, 384000.00, 'Active'),
('Annapoorna Dairy & Bakery', '+91 98450 12345', 'purchases@annapoorna.co.in', '89 Commercial Street, Mysuru', 62, 512000.00, 'Active'),
('Rajesh Kumar (Organic Mart)', '+91 97312 89012', 'rajesh.k@gmail.com', '45 Indiranagar, 10th Main, Bengaluru', 14, 45000.00, 'Active'),
('Mother Dairy Local Retailer', '+91 99001 56789', 'retailer.bengaluru@motherdairy.com', '500 Ring Road, Rajajinagar', 35, 680000.00, 'Active'),
('Priya Sharma (Apartments Society)', '+91 98860 77889', 'priya.sharma@yahoo.co.in', 'Flat 402, Green Acres, Whitefield', 9, 18500.00, 'Active')
ON CONFLICT (phone) DO NOTHING;

-- Insert Sample Employees (Salaries in ₹ INR)
INSERT INTO public.employees (name, role, phone, salary, attendance_status, join_date)
VALUES
('Dr. Ramesh Rao', 'Chief Veterinarian', '+91 98440 11223', 65000.00, 'Present', '2022-03-01'),
('Suresh Gowda', 'Farm Operations Manager', '+91 98451 22334', 45000.00, 'Present', '2021-06-15'),
('Venkat Swamy', 'Milking Supervisor', '+91 98462 33445', 28000.00, 'Present', '2023-01-10'),
('Lakshmi Devi', 'Quality Assurance Lead', '+91 98473 44556', 32000.00, 'On Leave', '2023-09-20'),
('Manjunath B.', 'Feed & Cattle Specialist', '+91 98484 55667', 25000.00, 'Present', '2024-02-01');

-- Insert Sample Expenses (Amounts in ₹ INR)
INSERT INTO public.expenses (category, amount, description, date, payment_method)
VALUES
('Feed', 185000.00, 'Green Fodder, Cattle Feed Concentrate & Mineral Mixture', CURRENT_DATE - INTERVAL '3 days', 'Bank Transfer'),
('Medicine', 35000.00, 'FMD Vaccination Batch & Udder Health Supplements', CURRENT_DATE - INTERVAL '6 days', 'UPI'),
('Electricity', 48000.00, 'Bulk Milk Chiller (BMC) & Milking Machine Power', CURRENT_DATE - INTERVAL '16 days', 'Bank Transfer'),
('Maintenance', 18500.00, 'Automated Milking Machine Servicing & Filter Change', CURRENT_DATE - INTERVAL '9 days', 'UPI'),
('Transport', 24000.00, 'Refrigerated Delivery Vehicle Fuel & Toll Charges', CURRENT_DATE - INTERVAL '2 days', 'Cash');

-- Insert Sample Sales (Prices in ₹ INR)
INSERT INTO public.sales (invoice_number, customer_id, product_name, milk_quantity, price_per_liter, total_price, payment_status, date)
SELECT 
    'INV-2026-089', id, 'Desi A2 Gir Cow Milk', 200.0, 65.0, 13000.00, 'Paid', CURRENT_DATE
FROM public.customers WHERE phone = '+91 98765 43210'
ON CONFLICT (invoice_number) DO NOTHING;

INSERT INTO public.sales (invoice_number, customer_id, product_name, milk_quantity, price_per_liter, total_price, payment_status, date)
SELECT 
    'INV-2026-090', id, 'Pure Desi Cow Butter', 50.0, 350.0, 17500.00, 'Paid', CURRENT_DATE - INTERVAL '1 day'
FROM public.customers WHERE phone = '+91 98450 12345'
ON CONFLICT (invoice_number) DO NOTHING;

INSERT INTO public.sales (invoice_number, customer_id, product_name, milk_quantity, price_per_liter, total_price, payment_status, date)
SELECT 
    'INV-2026-091', id, 'Vedic Bilona Ghee & Paneer', 350.0, 120.0, 42000.00, 'Pending', CURRENT_DATE - INTERVAL '1 day'
FROM public.customers WHERE phone = '+91 99001 56789'
ON CONFLICT (invoice_number) DO NOTHING;
