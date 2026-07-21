import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogSection: React.FC = () => {
  const blogs = [
    {
      title: 'Understanding the Health Benefits of A2 Protein Milk vs Conventional Milk',
      category: 'Nutrition & Health',
      date: 'July 18, 2026',
      author: 'Dr. Marcus Vance',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Explore how natural A2 beta-casein protein supports better digestion and reduces inflammatory gut responses.',
    },
    {
      title: 'How IoT Telemetry Collars Reduced Disease Outbreaks by 85%',
      category: 'Smart Farming',
      date: 'July 12, 2026',
      author: 'Sarah Jenkins',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Real-time thermal sensors detect early fever symptoms 48 hours before physical indicators appear in cattle.',
    },
    {
      title: 'The Art of Traditional Bilona Ghee Making from Organic Cultured Butter',
      category: 'Farm Heritage',
      date: 'July 05, 2026',
      author: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Discover why slow wood-fire simmering yields granular texture, high smoke point, and rich golden aroma.',
    },
  ];

  return (
    <section className="py-24 relative bg-[#FFFDF8] dark:bg-[#0B1313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D8F87] dark:text-[#18B6A6]">
            Insights & Research
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            Latest Dairy Farm News
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Educational articles on sustainable agriculture, animal wellness, and dairy nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D8F87] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0D8F87]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#18B6A6]" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white leading-snug group-hover:text-[#0D8F87] dark:group-hover:text-[#18B6A6] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D8F87] dark:text-[#18B6A6] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
