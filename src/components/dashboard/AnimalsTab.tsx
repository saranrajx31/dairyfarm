import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Animal } from '../../types';
import { Plus, Search, Filter, Trash2, Edit, ShieldCheck, HeartPulse, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimalsTab: React.FC = () => {
  const { animals, addAnimal, updateAnimal, deleteAnimal, searchQuery } = useApp();
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const [selectedHealth, setSelectedHealth] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [tagNumber, setTagNumber] = useState('');
  const [breed, setBreed] = useState('Holstein Friesian');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [age, setAge] = useState<number>(3.5);
  const [weight, setWeight] = useState<number>(550);
  const [healthStatus, setHealthStatus] = useState<'Healthy' | 'Sick' | 'Under Treatment' | 'Quarantined'>('Healthy');
  const [purchaseDate, setPurchaseDate] = useState('2024-01-10');
  const [dailyAvgMilk, setDailyAvgMilk] = useState<number>(24);

  const breedsList = ['All', 'Holstein Friesian', 'Jersey', 'Gir', 'Sahiwal', 'Swiss Brown'];
  const healthList = ['All', 'Healthy', 'Sick', 'Under Treatment', 'Quarantined'];

  const filteredAnimals = animals.filter((a) => {
    const matchesSearch =
      a.tag_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || a.breed === selectedBreed;
    const matchesHealth = selectedHealth === 'All' || a.health_status === selectedHealth;
    return matchesSearch && matchesBreed && matchesHealth;
  });

  const openAddModal = () => {
    setEditingId(null);
    setTagNumber(`COW-00${animals.length + 1}`);
    setBreed('Holstein Friesian');
    setGender('Female');
    setAge(3.5);
    setWeight(550);
    setHealthStatus('Healthy');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    setDailyAvgMilk(22);
    setIsModalOpen(true);
  };

  const openEditModal = (animal: Animal) => {
    setEditingId(animal.id);
    setTagNumber(animal.tag_number);
    setBreed(animal.breed);
    setGender(animal.gender);
    setAge(animal.age);
    setWeight(animal.weight);
    setHealthStatus(animal.health_status);
    setPurchaseDate(animal.purchase_date);
    setDailyAvgMilk(animal.daily_avg_milk || 20);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAnimal(editingId, {
        tag_number: tagNumber,
        breed,
        gender,
        age: Number(age),
        weight: Number(weight),
        health_status: healthStatus,
        purchase_date: purchaseDate,
        daily_avg_milk: Number(dailyAvgMilk),
      });
    } else {
      addAnimal({
        tag_number: tagNumber,
        breed,
        gender,
        age: Number(age),
        weight: Number(weight),
        health_status: healthStatus,
        purchase_date: purchaseDate,
        status: 'Active',
        daily_avg_milk: Number(dailyAvgMilk),
        photo: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80',
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Animal Livestock Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track cattle profiles, health logs, breeds, and individual milk output.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Animal</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Filter className="w-4 h-4 text-[#0D8F87]" />
          <span>Filter Breeds:</span>
        </div>

        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
        >
          {breedsList.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 ml-4">
          <HeartPulse className="w-4 h-4 text-rose-500" />
          <span>Health Condition:</span>
        </div>

        <select
          value={selectedHealth}
          onChange={(e) => setSelectedHealth(e.target.value)}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
        >
          {healthList.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Animals Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 pl-6">Tag Number</th>
                <th className="p-4">Breed & Gender</th>
                <th className="p-4">Age / Weight</th>
                <th className="p-4">Avg Milk Yield</th>
                <th className="p-4">Health Status</th>
                <th className="p-4">Purchase Date</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <img
                      src={animal.photo || 'https://images.unsplash.com/photo-1570042702808-5858853f6053?auto=format&fit=crop&w=200&q=80'}
                      alt={animal.tag_number}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570042702808-5858853f6053?auto=format&fit=crop&w=200&q=80';
                      }}
                      className="w-9 h-9 rounded-xl object-cover border border-teal-200 dark:border-teal-800 shrink-0"
                    />
                    <div>
                      <span className="block font-heading text-sm text-[#0D8F87] dark:text-[#18B6A6]">
                        {animal.tag_number}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">ID: {animal.id}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{animal.breed}</span>
                    <span className="text-[10px] text-slate-400">{animal.gender}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{animal.age} Yrs</span>
                    <span className="text-[10px] text-slate-400">{animal.weight} kg</span>
                  </td>

                  <td className="p-4 font-bold text-teal-600 dark:text-teal-400">
                    {animal.daily_avg_milk || 20} L / day
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        animal.health_status === 'Healthy'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : animal.health_status === 'Under Treatment'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {animal.health_status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {animal.purchase_date}
                  </td>

                  <td className="p-4 pr-6 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(animal)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0D8F87] transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteAnimal(animal.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {editingId ? 'Edit Animal Record' : 'Register New Cattle'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tag Number</label>
                    <input
                      type="text"
                      required
                      value={tagNumber}
                      onChange={(e) => setTagNumber(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Breed</label>
                    <select
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      {breedsList.filter((b) => b !== 'All').map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (Yrs)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      required
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Avg (L)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={dailyAvgMilk}
                      onChange={(e) => setDailyAvgMilk(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Health Status</label>
                    <select
                      value={healthStatus}
                      onChange={(e) => setHealthStatus(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Healthy">Healthy</option>
                      <option value="Under Treatment">Under Treatment</option>
                      <option value="Sick">Sick</option>
                      <option value="Quarantined">Quarantined</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Purchase Date</label>
                    <input
                      type="date"
                      required
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
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
                    {editingId ? 'Update Record' : 'Save Animal'}
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
