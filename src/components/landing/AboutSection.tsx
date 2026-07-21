import React from 'react';
import { Users, Milk, Activity, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Healthy Cows', value: '200+', icon: Activity, description: 'Holstein & Jersey Breeds' },
    { label: 'Milk Daily', value: '500L+', icon: Milk, description: 'Pure A2 Grade Yield' },
    { label: 'Happy Customers', value: '1000+', icon: Heart, description: 'Retail & Commercial' },
    { label: 'Expert Employees', value: '25', icon: Users, description: 'Vets & Technicians' },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#FFFDF8] dark:bg-[#0B1313] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Image Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
                alt="Organic Pasture"
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Secondary Overlapping Image */}
            <div className="absolute -bottom-10 -right-6 w-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 hidden sm:block z-20">
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80"
                alt="Care for Dairy Cattle"
                className="w-full h-[220px] object-cover"
              />
            </div>

            {/* Organic Splash Backdrop Shape */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#0D8F87]/15 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#F7C948]/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Column: Story & Stats */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6]">
                Our Heritage & Science
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-2 leading-tight">
                Pioneering Sustainable & Precision Dairy Farming
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                Founded on principles of organic nutrition and animal welfare, our farm blends traditional pasture grazing with modern AI health telemetry. We ensure every drop of milk is fresh, unadulterated, and nutrient-dense from farm to table.
              </p>
            </div>

            {/* Core Values Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '100% Free-Range Pasture Feeding',
                'Zero Synthetic Hormones or Antibiotics',
                'Cold-Chain Temperature Monitored',
                'Automated Milking & Quality Testing',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#0D8F87] shrink-0" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              {stats.map((st, i) => {
                const IconComp = st.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/40 shadow-md text-center"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-500/10 text-[#0D8F87] flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">{st.value}</div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{st.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{st.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
