import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Eleanor Vance',
      role: 'Head Chef, Artisan Bistro',
      comment: 'The quality of cultured butter and raw A2 milk from Dairy Farm Pro is unprecedented. Our bakery items have seen an immediate upgrade in texture and aroma.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
    {
      name: 'Dr. Arthur Pendelton',
      role: 'Nutrition Specialist',
      comment: 'I recommend their A2 milk to all my patients with lactose sensitivity. The cold-chain delivery system ensures active enzymes and zero contamination.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
    {
      name: 'Sophia Martinez',
      role: 'Green Valley Organic Supermarket',
      comment: 'As a commercial buyer ordering over 300 liters weekly, the automated sales invoices and reliable supply schedule make them our favorite supplier.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 relative bg-slate-50/80 dark:bg-slate-900/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6]">
            Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            Loved By Chefs & Families Alike
          </h2>
        </div>

        <div className="relative bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-slate-100 dark:text-slate-800 -z-0" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-6"
            >
              <div className="flex items-center gap-1 text-[#F7C948]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F7C948]" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 italic font-medium leading-relaxed">
                "{current.comment}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#0D8F87]"
                />
                <div>
                  <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-[#0D8F87] hover:text-white transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-[#0D8F87] hover:text-white transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
