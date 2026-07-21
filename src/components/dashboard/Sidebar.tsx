import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShieldCheck,
  Droplet,
  Users,
  TrendingUp,
  UserCheck,
  HeartPulse,
  GitBranch,
  DollarSign,
  FileSpreadsheet,
  Settings,
  LogOut,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setCurrentView } = useApp();
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'animals', label: 'Animals', icon: ShieldCheck, badge: '214' },
    { id: 'milk', label: 'Milk Production', icon: Droplet },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sales', label: 'Sales & Invoices', icon: TrendingUp },
    { id: 'employees', label: 'Employees', icon: UserCheck },
    { id: 'health', label: 'Health & Vet', icon: HeartPulse, badge: '2 Alert' },
    { id: 'breeding', label: 'Breeding', icon: GitBranch },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 transition-colors z-20">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0D8F87] to-[#18B6A6] flex items-center justify-center text-xl shadow-md">
            🐄
          </div>
          <div>
            <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white leading-tight">
              Dairy Farm <span className="text-[#0D8F87] dark:text-[#18B6A6]">Pro</span>
            </h2>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] no-scrollbar">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white shadow-lg shadow-teal-700/25'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0D8F87] dark:text-[#18B6A6]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-teal-50 dark:bg-slate-800 text-[#0D8F87] dark:text-[#18B6A6]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer User Chip & Actions */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={() => setCurrentView('landing')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0D8F87]" />
            <span>Public Website</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.full_name || 'Admin'}
              className="w-9 h-9 rounded-full object-cover border border-teal-500"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                {user?.full_name || 'Sarah Jenkins'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              setCurrentView('landing');
            }}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
