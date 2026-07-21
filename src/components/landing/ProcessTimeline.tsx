import React from 'react';
import { Wheat, Droplet, TestTube, Package, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    { number: '01', title: 'Organic Feed', text: 'Grass-fed nutrition enriched with organic alfalfa and clean spring water.', icon: Wheat },
    { number: '02', title: 'Hygienic Milking', text: 'Touchless automated milking in stress-free parlor environments.', icon: Droplet },
    { number: '03', title: 'Quality Check', text: 'Instant lab testing for purity, fat content, bacterial safety, and temperature.', icon: TestTube },
    { number: '04', title: 'Eco Packaging', text: 'Bottled in sterilized eco-friendly glass bottles to preserve original taste.', icon: Package },
    { number: '05', title: 'Cold Delivery', text: 'Refrigerated vans deliver farm fresh milk straight to your doorstep.', icon: Truck },
  ];

  return (
    <section id="process" className="py-24 relative bg-[#FFFDF8] dark:bg-[#0B1313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6]">
            From Pasture To Porch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            Our 5-Stage Farm-Fresh Process
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            How we maintain unmatched purity and nutrient retention at every single step.
          </p>
        </div>

        {/* Desktop Horizontal Process Bar / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-[#0D8F87] via-[#18B6A6] to-[#F7C948] -translate-y-6 z-0" />

          {steps.map((st, i) => {
            const IconComp = st.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative z-10 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl text-center flex flex-col items-center justify-between"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0D8F87] to-[#18B6A6] text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white dark:border-slate-900">
                  <IconComp className="w-7 h-7" />
                </div>

                <span className="text-xs font-bold text-[#F7C948] uppercase tracking-widest mb-1">
                  Step {st.number}
                </span>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {st.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {st.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
