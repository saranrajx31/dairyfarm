import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, Award, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden milk-splash-gradient">
      {/* Background Decorative Milk Splashes & Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F7C948]/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Organic Curved Splash Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16 fill-[#FFFDF8] dark:fill-[#0B1313]"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0D8F87] dark:text-[#18B6A6] text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#F7C948]" />
              <span>Next-Gen Organic Dairy Management</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 dark:text-white leading-[1.15]"
            >
              Fresh Milk Direct <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D8F87] via-[#18B6A6] to-[#F7C948]">
                From Our Farm
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Empowering sustainable dairy farming with IoT animal health tracking, precision milk yield analytics, automated inventory, and direct-to-consumer organic dairy distribution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => setCurrentView('dashboard')}
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-sm shadow-xl shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Explore Farm Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#products"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-slate-800 dark:text-white font-semibold text-sm hover:bg-teal-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-[#0D8F87] fill-[#0D8F87]" />
                <span>View Organic Products</span>
              </a>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-[#0D8F87] shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">100% Pure A2 Organic</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <HeartPulse className="w-5 h-5 text-[#18B6A6] shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">AI Health Monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Award className="w-5 h-5 text-[#F7C948] shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">ISO Certified Farm</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Graphic Illustration & Animated Splash Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Organic Curved Splash Frame */}
            <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-[#0D8F87]/20 via-[#18B6A6]/30 to-[#F7C948]/30 p-4 animate-float shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
                  alt="Organic Dairy Farm Cow"
                  className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge 1: 500L Daily */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -left-4 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/60 dark:border-slate-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0D8F87] text-white flex items-center justify-center text-xl font-bold">
                  🥛
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Daily Production</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-heading">548.5 Liters</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: 200+ Healthy Cows */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 -right-4 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/60 dark:border-slate-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7C948] text-slate-900 flex items-center justify-center text-xl font-bold">
                  🐄
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Healthy Cattle</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-heading">214 Registered</div>
                </div>
              </motion.div>

              {/* Floating Badge 3: Quality Check */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute top-1/2 -right-8 glass-card py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2 border border-teal-100 dark:border-teal-900"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">100% Cold-Chain Fresh</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
