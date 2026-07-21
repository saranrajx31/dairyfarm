import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Droplet, Calendar, FileText, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MilkProductionTab: React.FC = () => {
  const { milkRecords, addMilkRecord } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [morningMilk, setMorningMilk] = useState<number>(285.5);
  const [eveningMilk, setEveningMilk] = useState<number>(263.0);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMilkRecord({
      date,
      morning_milk: Number(morningMilk),
      evening_milk: Number(eveningMilk),
      notes: notes || 'Daily milking session',
    });
    setIsModalOpen(false);
  };

  const chartData = milkRecords.slice().reverse().map((r) => ({
    date: r.date.split('-').slice(1).join('/'),
    morning: r.morning_milk,
    evening: r.evening_milk,
    total: r.total_milk,
  }));

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Daily Milk Production Records
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log morning and evening yield logs, view total volume, and analyze seasonal production curves.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Today's Yield</span>
        </button>
      </div>

      {/* Production Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              7-Day Milk Production Comparison
            </h3>
            <p className="text-xs text-slate-400">Morning vs Evening session breakdown</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#0D8F87]">
              <span className="w-3 h-3 rounded-full bg-[#0D8F87]" /> Morning
            </span>
            <span className="flex items-center gap-1.5 text-[#F7C948]">
              <span className="w-3 h-3 rounded-full bg-[#F7C948]" /> Evening
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderRadius: '12px', color: '#FFF' }} />
              <Area type="monotone" dataKey="morning" stroke="#0D8F87" fill="#0D8F87" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="evening" stroke="#F7C948" fill="#F7C948" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Records Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Morning Yield (L)</th>
                <th className="p-4">Evening Yield (L)</th>
                <th className="p-4">Total Daily Yield (L)</th>
                <th className="p-4 pr-6">Notes / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {milkRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0D8F87]" />
                    <span>{r.date}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{r.morning_milk} L</td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{r.evening_milk} L</td>
                  <td className="p-4 font-bold text-[#0D8F87] text-sm">{r.total_milk} L</td>
                  <td className="p-4 pr-6 text-slate-500 dark:text-slate-400">{r.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Milk Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Log Milk Production
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Morning Session (L)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={morningMilk}
                      onChange={(e) => setMorningMilk(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Evening Session (L)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={eveningMilk}
                      onChange={(e) => setEveningMilk(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks / Feed Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Fresh clover feed day, good climate"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white text-xs font-semibold shadow-md"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
