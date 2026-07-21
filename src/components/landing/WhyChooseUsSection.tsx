import React from 'react';
import { Leaf, Heart, Stethoscope, Building2, Sparkles, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    { title: 'Organic Feed', text: 'Non-GMO alfalfa, green pasture clover, and natural mineral supplements for optimal cow digestion.', icon: Leaf },
    { title: 'Healthy Animals', text: 'Comfortable ventilated barns, automated grooming brushes, and zero stress environments.', icon: Heart },
    { title: 'Veterinary Support', text: '24/7 resident veterinarians providing daily health checks, vaccinations, and preventive care.', icon: Stethoscope },
    { title: 'Modern Farm', text: 'State-of-the-art robotic milking parlors with instant chilling tanks preserving maximum freshness.', icon: Building2 },
    { title: 'Fresh Products', text: 'Delivered within 12 hours of morning milking using cold-chain temperature controlled vans.', icon: Sparkles },
    { title: 'AI Monitoring', text: 'Smart collars and IoT sensors tracking real-time body temperature, rumination, and milk yield.', icon: Cpu },
  ];

  return (
    <section className="py-24 relative bg-slate-900 text-white overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D8F87]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F7C948]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18B6A6]">
            Uncompromised Quality Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Why Choose Our Dairy Farm?
          </h2>
          <p className="text-slate-400 text-base">
            We fuse time-tested organic farming principles with modern IoT technology to bring you pristine dairy products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pil, idx) => {
            const IconComp = pil.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md shadow-xl hover:border-teal-500/50 transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0D8F87] to-[#18B6A6] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white mb-2">{pil.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{pil.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
