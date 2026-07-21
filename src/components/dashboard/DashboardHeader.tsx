import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, Sun, Moon, Database, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardHeader: React.FC = () => {
  const { darkMode, setDarkMode, searchQuery, setSearchQuery, notifications, markNotificationRead } = useApp();
  const { isSupabaseLive } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-10 transition-colors">
      {/* Global Search Everywhere Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cows tag#, customers, sales invoices, employees..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-[#0D8F87] rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Supabase Status Chip */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold">
          <Database className={`w-3.5 h-3.5 ${isSupabaseLive ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span className="text-slate-700 dark:text-slate-300">
            {isSupabaseLive ? 'Supabase Connected' : 'Mock DB Mode'}
          </span>
          <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
        </div>

        {/* Theme Switcher */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-[#F7C948]" /> : <Moon className="w-4 h-4 text-[#0D8F87]" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold font-heading text-slate-900 dark:text-white">
                    Farm Notifications
                  </h4>
                  <span className="text-[10px] bg-teal-100 dark:bg-teal-900/50 text-[#0D8F87] dark:text-[#18B6A6] px-2 py-0.5 rounded-full font-bold">
                    {unreadCount} New
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors flex items-start gap-3 border ${
                        n.is_read
                          ? 'bg-slate-50 dark:bg-slate-800/40 border-transparent'
                          : 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800'
                      }`}
                    >
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                      {n.type === 'info' && <Bell className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                      {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}

                      <div className="text-left overflow-hidden">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {n.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                          {n.message}
                        </p>
                        <span className="text-[9px] text-slate-400 mt-1 block font-medium">
                          {n.created_at}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
