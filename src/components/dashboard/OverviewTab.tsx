import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/utils';
import { monthlyMilkYieldData } from '../../lib/mockData';
import {
  ShieldCheck,
  Droplet,
  DollarSign,
  Users,
  UserCheck,
  TrendingDown,
  TrendingUp,
  Calendar,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const OverviewTab: React.FC = () => {
  const { stats, healthRecords, sales, setActiveTab } = useApp();

  const statCards = [
    { title: 'Total Animals', value: stats.totalAnimals, change: '+4 this month', icon: ShieldCheck, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40', link: 'animals' },
    { title: "Today's Milk", value: `${stats.todaysMilk} L`, change: '+5.2% vs yesterday', icon: Droplet, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/40', link: 'milk' },
    { title: 'Monthly Revenue', value: formatCurrency(stats.monthlyRevenue), change: '+12.4% MoM', icon: DollarSign, color: 'text-[#0D8F87] dark:text-[#18B6A6]', bg: 'bg-emerald-50 dark:bg-emerald-950/40', link: 'sales' },
    { title: 'Active Customers', value: stats.activeCustomers, change: '+18 new signups', icon: Users, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40', link: 'customers' },
    { title: 'Employees', value: stats.employeesCount, change: '100% Present today', icon: UserCheck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40', link: 'employees' },
    { title: 'Monthly Expenses', value: formatCurrency(stats.monthlyExpenses), change: '-2.1% lower feed cost', icon: TrendingDown, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40', link: 'expenses' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D8F87] via-[#18B6A6] to-[#0D8F87] text-white shadow-xl">
        <div>
          <h2 className="text-2xl font-bold font-heading">Good Morning, Farm Manager 👋</h2>
          <p className="text-xs text-teal-100 mt-1">
            Here is your daily livestock production summary and operational health overview.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('milk')}
          className="px-5 py-2.5 rounded-2xl bg-white text-[#0D8F87] font-semibold text-xs shadow-md hover:bg-teal-50 transition-colors shrink-0"
        >
          + Log Morning Milk Yield
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, i) => {
          const IconComp = card.icon;
          return (
            <div
              key={i}
              onClick={() => setActiveTab(card.link)}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-teal-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#0D8F87] transition-colors" />
              </div>

              <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {card.value}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {card.title}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </span>
                <span className="text-slate-400 font-medium">Real-time</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Milk Production Trend Area Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Milk Yield Trend (Liters)
              </h3>
              <p className="text-xs text-slate-400">Monthly total milk collected across all herds</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-[#0D8F87] dark:text-[#18B6A6] text-xs font-bold">
              2026 Season
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyMilkYieldData}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D8F87" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0D8F87" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderRadius: '12px', border: 'none', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#0D8F87" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Sales Revenue Bar Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Revenue Growth (₹)
              </h3>
              <p className="text-xs text-slate-400">Direct sales & subscriptions</p>
            </div>
            <span className="text-xs font-bold text-[#F7C948]">+14% Growth</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyMilkYieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderRadius: '12px', border: 'none', color: '#FFF' }}
                />
                <Bar dataKey="sales" fill="#18B6A6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Vaccinations & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Health Vaccinations */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Upcoming Vaccinations & Checkups
            </h3>
            <button onClick={() => setActiveTab('health')} className="text-xs text-[#0D8F87] font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {healthRecords.map((hr) => (
              <div
                key={hr.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-[#0D8F87] text-[10px] font-bold">
                      {hr.animal_tag}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{hr.type}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{hr.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0D8F87]" />
                    {hr.next_due_date}
                  </div>
                  <span className="text-[10px] text-amber-500 font-medium">Doctor: {hr.doctor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Recent Sales & Invoices
            </h3>
            <button onClick={() => setActiveTab('sales')} className="text-xs text-[#0D8F87] font-semibold hover:underline">
              View All Sales
            </button>
          </div>

          <div className="space-y-3">
            {sales.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{s.customer_name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{s.invoice_number} • {s.product_name}</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{formatCurrency(s.total_price)}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      s.payment_status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : s.payment_status === 'Pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {s.payment_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
