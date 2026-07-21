# 🐄 Dairy Farm Management System (Full-Stack)

A modern, premium, full-stack Dairy Farm Management System built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Recharts**, and **Supabase**.

Inspired by organic, curved milk-splash aesthetic design featuring a public landing page and a full-featured Admin Management Dashboard.

---

## 🎨 Color Palette & Aesthetic Tokens
- **Primary Color**: `#0D8F87` (Deep Teal Green)
- **Secondary Color**: `#18B6A6` (Aqua Teal)
- **Accent Color**: `#F7C948` (Golden Butter Yellow)
- **Background Color**: `#FFFDF8` (Warm Cream White)
- **Typography**:
  - Headings: `Playfair Display`
  - Body: `Poppins`

---

## 🚀 Features & Modules

### 🌐 Public Landing Page
1. **Header / Navbar**: Sticky blur navbar, logo (`🐄 Dairy Farm Pro`), links, theme switcher, Auth Modal.
2. **Hero Section**: Dual CTAs ("Explore Farm Dashboard", "View Products"), floating 3D milk splash badges, animated yield counter.
3. **About Section**: Farm story, values, interactive stats (200+ Cows, 500L Milk Daily, 1000+ Customers, 25 Employees).
4. **Features Grid**: 8 cards (Animal Management, Milk Production, Customer Mgmt, Sales, Employees, Vaccination, Expenses, Analytics).
5. **Products Showcase**: 8 organic items (Milk, Butter, Cheese, Curd, Paneer, Ghee, Yogurt, Cream) with category filtering and sample order actions.
6. **Why Choose Us**: 6 benefit pillars (Organic Feed, Healthy Animals, Veterinary Support, Modern Farm, Fresh Products, AI Monitoring).
7. **Process Timeline**: 5-step visual workflow (Feed -> Milking -> Quality Check -> Packaging -> Delivery).
8. **Testimonials**: Interactive quote cards.
9. **Blog Section**: 3 latest dairy research news cards.
10. **Footer**: Quick links, contact details, social links, newsletter subscription.

### 💼 Admin Dashboard Modules
1. **Dashboard Home**: 6 KPI cards, Recharts Area Milk Trend graph, Monthly Sales Revenue bar chart, Upcoming Vaccinations, Recent Invoices.
2. **Animal Management**: CRUD table with tag ID search, breed filter, health status badges, and registration modal.
3. **Milk Production**: Morning & evening yield recorder, daily total auto-calculator, 7-day comparison graph.
4. **Customer Directory**: Customer records, spent amounts, order counts, and registration form.
5. **Sales & Invoices**: Digital invoice generator modal, payment status tags (Paid/Pending/Overdue), and revenue tracking.
6. **Employee Roster**: Staff directory, role tags, attendance status, and monthly salary logs.
7. **Health & Veterinary**: Scheduled vaccinations, medical treatment logs, doctor info, next due date alerts.
8. **Breeding Tracker**: Gestation cycles, artificial insemination dates, expected calving delivery windows.
9. **Expense Tracker**: Categorized costs (Feed, Medicine, Electricity, Transport), pie chart budget share.
10. **Reports Generator**: Configurable monthly & yearly report builder with CSV/Excel and PDF download triggers.
11. **Settings**: Farm business profile, milk price per liter config, Supabase status indicator.

---

## 🛠️ Tech Stack & Dependencies
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables + Organic Curve Utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database Backend**: Supabase PostgreSQL (SQL Schema included)

---

## 📁 Folder Structure

```
dairy-farm-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/                    # Base Toast & UI components
│   │   ├── landing/               # 10 Landing Page Section components
│   │   └── dashboard/             # 13 Admin Dashboard Module components
│   ├── context/
│   │   ├── AppContext.tsx         # Global CRUD state & Toast notification context
│   │   └── AuthContext.tsx        # Supabase + Mock Auth context
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client initializer
│   │   ├── mockData.ts            # Rich fallback seed datasets
│   │   └── utils.ts               # Currency formatters & CSV export engine
│   ├── types/
│   │   └── index.ts               # TypeScript domain interfaces
│   ├── App.tsx                    # Layout router (Landing <-> Dashboard)
│   ├── index.css                  # Google Fonts & Tailwind styling directives
│   └── main.tsx
├── supabase/
│   └── schema.sql                 # Complete Supabase PostgreSQL schema with RLS
├── .env.example
├── package.json
└── README.md
```

---

## 💻 Installation & Setup

1. **Navigate to project directory**:
   ```bash
   cd C:\Users\santh\.gemini\antigravity-ide\scratch\dairy-farm-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Setup Supabase Database (When ready)**:
   - Create a project on [Supabase](https://supabase.com).
   - Go to the **SQL Editor** in your Supabase dashboard.
   - Copy and paste the contents of `supabase/schema.sql` and run it.
   - Create a `.env` file from `.env.example` and set your credentials:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
