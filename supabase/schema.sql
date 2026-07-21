-- ========================================================
-- DAIRY FARM MANAGEMENT SYSTEM - SUPABASE DATABASE SCHEMA
-- ========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (AUTHENTICATION USER DATA)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'Manager' CHECK (role IN ('Admin', 'Manager', 'Veterinarian', 'Staff')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ANIMALS TABLE (LIVESTOCK DATA)
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

-- 3. MILK PRODUCTION TABLE
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

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100),
    address TEXT NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_spent NUMERIC(10, 2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SALES & INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    milk_quantity NUMERIC(8, 2) NOT NULL,
    price_per_liter NUMERIC(6, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'Paid' CHECK (payment_status IN ('Paid', 'Pending', 'Overdue')),
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. EMPLOYEES TABLE
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    attendance_status VARCHAR(20) DEFAULT 'Present' CHECK (attendance_status IN ('Present', 'Absent', 'On Leave')),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Feed', 'Medicine', 'Electricity', 'Salary', 'Transport', 'Maintenance', 'Equipment', 'Other')),
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(30) DEFAULT 'Cash' CHECK (payment_method IN ('Cash', 'Bank Transfer', 'Card', 'UPI')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. HEALTH RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Vaccination', 'Treatment', 'Routine Checkup', 'Deworming')),
    description TEXT NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    cost NUMERIC(8, 2) DEFAULT 0,
    record_date DATE DEFAULT CURRENT_DATE,
    next_due_date DATE,
    status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Scheduled', 'Overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. BREEDING TABLE
CREATE TABLE IF NOT EXISTS public.breeding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    breeding_date DATE NOT NULL,
    pregnancy_status VARCHAR(30) DEFAULT 'Pending' CHECK (pregnancy_status IN ('Confirmed', 'Pending', 'Not Pregnant', 'Delivered')),
    expected_delivery DATE,
    actual_delivery DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Feed', 'Medicine', 'Equipment', 'Packaging', 'Supplies')),
    quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    reorder_level NUMERIC(10, 2) NOT NULL,
    price NUMERIC(8, 2) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'alert')),
    is_read BOOLEAN DEFAULT false,
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
ALTER TABLE public.breeding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full read & write access to dairy farm records
CREATE POLICY "Allow authenticated read/write on profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on animals" ON public.animals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on milk_production" ON public.milk_production FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on customers" ON public.customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on sales" ON public.sales FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on employees" ON public.employees FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on expenses" ON public.expenses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on health_records" ON public.health_records FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on breeding" ON public.breeding FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on inventory" ON public.inventory FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on notifications" ON public.notifications FOR ALL USING (auth.role() = 'authenticated');

-- Trigger to handle new user registration automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'Manager'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
