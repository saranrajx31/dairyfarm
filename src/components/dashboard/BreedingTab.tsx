import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, GitBranch, Calendar, Heart, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BreedingTab: React.FC = () => {
  const { breedingRecords, animals, addBreedingRecord } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [animalId, setAnimalId] = useState(animals[0]?.id || '');
  const [breedingDate, setBreedingDate] = useState('2026-02-14');
  const [pregnancyStatus, setPregnancyStatus] = useState<'Confirmed' | 'Pending' | 'Not Pregnant' | 'Delivered'>('Confirmed');
  const [expectedDelivery, setExpectedDelivery] = useState('2026-11-20');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const anim = animals.find((a) => a.id === animalId);
    addBreedingRecord({
      animal_id: animalId,
      animal_tag: anim ? anim.tag_number : 'COW-001',
      breeding_date: breedingDate,
      pregnancy_status: pregnancyStatus,
      expected_delivery: expectedDelivery,
      notes: notes || 'Artificial Insemination logged.',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Livestock Breeding & Calving History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor gestation cycles, artificial insemination dates, and expected calving delivery windows.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Breeding Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breedingRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-[#0D8F87] text-xs font-bold font-heading">
                  {rec.animal_tag}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    rec.pregnancy_status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : rec.pregnancy_status === 'Pending'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {rec.pregnancy_status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Breeding Date:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{rec.breeding_date}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Expected Calving:</span>
                  <span className="font-bold text-[#0D8F87] dark:text-[#18B6A6]">{rec.expected_delivery}</span>
                </div>
              </div>

              {rec.notes && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-800 mt-3">
                  "{rec.notes}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Breeding Log Modal */}
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
                  Log Breeding & Pregnancy
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
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Breeding Date</label>
                    <input
                      type="date"
                      required
                      value={breedingDate}
                      onChange={(e) => setBreedingDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pregnancy Status</label>
                    <select
                      value={pregnancyStatus}
                      onChange={(e) => setPregnancyStatus(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Not Pregnant">Not Pregnant</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={expectedDelivery}
                    onChange={(e) => setExpectedDelivery(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Breeding Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ultrasound confirmed healthy calf"
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
                    Save Breeding Record
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
