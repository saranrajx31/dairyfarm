import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, HeartPulse, Stethoscope, Calendar, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HealthTab: React.FC = () => {
  const { healthRecords, animals, addHealthRecord } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [animalId, setAnimalId] = useState(animals[0]?.id || '');
  const [type, setType] = useState<'Vaccination' | 'Treatment' | 'Routine Checkup' | 'Deworming'>('Vaccination');
  const [description, setDescription] = useState('');
  const [doctor, setDoctor] = useState('Dr. Marcus Vance');
  const [cost, setCost] = useState<number>(45);
  const [nextDueDate, setNextDueDate] = useState('2026-11-10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const anim = animals.find((a) => a.id === animalId);
    addHealthRecord({
      animal_id: animalId,
      animal_tag: anim ? anim.tag_number : 'COW-001',
      type,
      description,
      doctor,
      cost: Number(cost),
      record_date: new Date().toISOString().split('T')[0],
      next_due_date: nextDueDate,
      status: 'Completed',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Veterinary Care & Vaccination Schedules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log treatments, scheduled booster vaccinations, doctor visits, and veterinary expenses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Medical Record</span>
        </button>
      </div>

      {/* Health Records Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 pl-6">Tag #</th>
                <th className="p-4">Care Type</th>
                <th className="p-4">Medical Description</th>
                <th className="p-4">Attending Doctor</th>
                <th className="p-4">Cost ($)</th>
                <th className="p-4">Log Date</th>
                <th className="p-4 pr-6">Next Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {healthRecords.map((hr) => (
                <tr key={hr.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 pl-6 font-bold text-[#0D8F87] dark:text-[#18B6A6]">
                    {hr.animal_tag}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {hr.type}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs">
                    {hr.description}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                    {hr.doctor}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ${hr.cost}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    {hr.record_date}
                  </td>
                  <td className="p-4 pr-6 font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {hr.next_due_date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medical Log Modal */}
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
                  Log Veterinary Medical Care
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Animal Tag</label>
                  <select
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  >
                    {animals.map((a) => (
                      <option key={a.id} value={a.id}>{a.tag_number} ({a.breed})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Care Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Vaccination">Vaccination</option>
                      <option value="Treatment">Treatment</option>
                      <option value="Routine Checkup">Routine Checkup</option>
                      <option value="Deworming">Deworming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cost ($)</label>
                    <input
                      type="number"
                      required
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Medical Description</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. FMD Booster Injection Batch #88"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor Name</label>
                    <input
                      type="text"
                      required
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Next Follow-Up Due</label>
                    <input
                      type="date"
                      required
                      value={nextDueDate}
                      onChange={(e) => setNextDueDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
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
                    Save Medical Log
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
