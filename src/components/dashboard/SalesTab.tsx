import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/utils';
import { Plus, TrendingUp, Receipt, FileText, CheckCircle2, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SalesTab: React.FC = () => {
  const { sales, customers, addSale, searchQuery } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productName, setProductName] = useState('Raw A2 Whole Milk');
  const [milkQuantity, setMilkQuantity] = useState<number>(100);
  const [pricePerLiter, setPricePerLiter] = useState<number>(2.5);
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');

  const filteredSales = sales.filter(
    (s) =>
      s.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === customerId);
    addSale({
      customer_id: customerId,
      customer_name: cust ? cust.name : 'Walk-in Customer',
      product_name: productName,
      milk_quantity: Number(milkQuantity),
      price_per_liter: Number(pricePerLiter),
      payment_status: paymentStatus,
      date: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Sales & Invoice Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate digital sales invoices, track revenue payments, and monitor outstanding receivables.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Sales Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 pl-6">Invoice #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product / Item</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Rate / Unit</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 pr-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 pl-6 font-bold text-[#0D8F87] dark:text-[#18B6A6] font-heading">
                    {s.invoice_number}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {s.customer_name}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">
                    {s.product_name}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {s.milk_quantity} L / Units
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ${s.price_per_liter.toFixed(2)}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">
                    {formatCurrency(s.total_price)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        s.payment_status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : s.payment_status === 'Pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {s.payment_status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-slate-500 dark:text-slate-400">
                    {s.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
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
                  Create Sales Invoice
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Customer</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Description</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Raw A2 Whole Milk"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity (L/Kg)</label>
                    <input
                      type="number"
                      required
                      value={milkQuantity}
                      onChange={(e) => setMilkQuantity(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Price per Liter (₹)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={pricePerLiter}
                      onChange={(e) => setPricePerLiter(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Invoice Price:</span>
                  <span className="font-bold font-heading text-base text-[#0D8F87] dark:text-[#18B6A6]">
                    {formatCurrency(Number(milkQuantity) * Number(pricePerLiter))}
                  </span>
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
                    Generate Invoice
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
