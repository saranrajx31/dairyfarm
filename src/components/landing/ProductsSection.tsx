import React, { useState } from 'react';
import { dairyProducts } from '../../lib/mockData';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/utils';
import { ShoppingBag, Star, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductsSection: React.FC = () => {
  const { showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Milk', 'Butter', 'Cheese', 'Curd', 'Paneer', 'Ghee', 'Yogurt', 'Cream'];

  const filteredProducts = activeCategory === 'All'
    ? dairyProducts
    : dairyProducts.filter((p) => p.category === activeCategory);

  const handleOrder = (productName: string) => {
    showToast(`Added ${productName} to sample order cart!`, 'success');
  };

  return (
    <section id="products" className="py-24 relative bg-[#FFFDF8] dark:bg-[#0B1313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F7C948]" />
            Farm Fresh Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            100% Pure Organic Dairy Range
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Crafted from raw A2 milk under strict hygienic standards. Free from preservatives, additives, or synthetic colors.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0D8F87] text-white shadow-lg shadow-teal-700/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

                {prod.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F7C948] text-slate-900 text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {prod.badge}
                  </span>
                )}

                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white text-[11px] font-semibold border border-white/20">
                  {prod.fatContent}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#0D8F87] dark:text-[#18B6A6]">{prod.category}</span>
                    <div className="flex items-center gap-1 text-[#F7C948] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#F7C948]" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#0D8F87] dark:group-hover:text-[#18B6A6] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mt-1">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">{formatCurrency(prod.price)}</span>
                    <span className="text-[10px] text-slate-400 block">{prod.unit}</span>
                  </div>

                  <button
                    onClick={() => handleOrder(prod.name)}
                    className="p-3 rounded-2xl bg-[#0D8F87] text-white hover:bg-[#18B6A6] hover:scale-105 transition-all shadow-md flex items-center justify-center"
                    aria-label={`Order ${prod.name}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
