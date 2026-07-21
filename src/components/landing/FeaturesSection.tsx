import React from 'react';
import {
  ShieldCheck,
  Droplet,
  Users,
  TrendingUp,
  UserCheck,
  Stethoscope,
  DollarSign,
  PieChart,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Animal Management',
      description: 'Comprehensive livestock registration, breed tracking, weight monitoring, health history, and electronic tag ID lookups.',
      icon: ShieldCheck,
      color: 'from-teal-500 to-[#0D8F87]',
    },
    {
      title: 'Milk Production',
      description: 'Daily morning and evening yield logging per cow or batch with real-time analytics and seasonal yield forecasting.',
      icon: Droplet,
      color: 'from-cyan-500 to-teal-600',
    },
    {
      title: 'Customer Management',
      description: 'Directory for wholesale buyers, supermarkets, and residential subscriptions with delivery history and balance tracking.',
      icon: Users,
      color: 'from-amber-400 to-[#F7C948]',
    },
    {
      title: 'Sales Tracking',
      description: 'Instant invoice generation, payment status tracking (Paid/Pending/Overdue), and digital receipt downloads.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-700',
    },
    {
      title: 'Employee Management',
      description: 'Staff attendance logging, role assignments (Vets, Milking Specialists, Managers), and automated monthly salary slips.',
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Vaccination Records',
      description: 'Schedule automated reminders for FMD, Deworming, and routine veterinary checkups to eliminate disease outbreaks.',
      icon: Stethoscope,
      color: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Expense Management',
      description: 'Categorized expense recording for feed, medicines, utilities, salaries, and cold-chain transport with budget controls.',
      icon: DollarSign,
      color: 'from-violet-500 to-purple-700',
    },
    {
      title: 'Analytics & Reports',
      description: 'Export comprehensive PDF, CSV, and Excel financial and operational reports with dynamic interactive charts.',
      icon: PieChart,
      color: 'from-[#0D8F87] to-[#18B6A6]',
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-slate-50/70 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6]">
            All-In-One Dairy Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            End-To-End Management Features
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Streamline every aspect of your dairy farm operations with modern cloud technology, automated schedules, and intelligent insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 group-hover:text-[#0D8F87] dark:group-hover:text-[#18B6A6] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
