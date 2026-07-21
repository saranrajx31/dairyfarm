import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Settings, Building, DollarSign, Database, Save, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { showToast } = useApp();
  const { isSupabaseLive } = useAuth();

  const [farmName, setFarmName] = useState('Nandi Organic Dairy Farm');
  const [address, setAddress] = useState('1204 Dairy Circle, MG Road, Bengaluru, Karnataka');
  const [milkPrice, setMilkPrice] = useState<number>(65);
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Farm settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          System & Farm Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage farm profile, default milk pricing per liter, and Supabase database connection.
        </p>
      </div>

      {/* Supabase Connection Banner */}
      <div className={`p-6 rounded-3xl border flex items-start gap-4 shadow-md ${
        isSupabaseLive
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
      }`}>
        <Database className={`w-6 h-6 shrink-0 mt-0.5 ${isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'}`} />
        <div className="space-y-1">
          <h3 className={`text-sm font-bold ${isSupabaseLive ? 'text-emerald-900 dark:text-emerald-200' : 'text-amber-900 dark:text-amber-200'}`}>
            {isSupabaseLive ? 'Supabase Database Connected & Syncing' : 'Supabase Backend Ready for Integration'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isSupabaseLive
              ? 'Your live PostgreSQL database tables (`animals`, `milk_production`, `sales`, etc.) are synchronized.'
              : 'The project includes a complete `supabase/schema.sql` file. When ready, provide your Supabase URL and anon key to connect real-time sync.'}
          </p>
        </div>
      </div>

      {/* Farm Details Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Farm Business Profile
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Dairy Farm Commercial Name
            </label>
            <input
              type="text"
              required
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Official Physical Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Default Standard Milk Price / Liter
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={milkPrice}
                onChange={(e) => setMilkPrice(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Currency Unit
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
