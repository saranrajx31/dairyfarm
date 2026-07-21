import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, Globe, MessageCircle, Share2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast('Subscribed to Dairy Farm newsletter!', 'success');
    setEmailInput('');
  };

  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0D8F87] to-[#18B6A6] flex items-center justify-center text-2xl shadow-lg">
                🐄
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white flex items-center gap-1.5">
                  Dairy Farm <span className="text-[#18B6A6]">Pro</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Management & Fresh Distribution
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering local organic dairy farming with IoT animal health tracking, precision daily milk logging, direct retail sales, and smart automated management systems.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-500 hover:bg-slate-800 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#hero" className="hover:text-teal-400 transition-colors">Home Overview</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Our Farm</a></li>
              <li><a href="#products" className="hover:text-teal-400 transition-colors">Organic Products</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition-colors">System Features</a></li>
              <li><a href="#process" className="hover:text-teal-400 transition-colors">5-Stage Process</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Farm Contact</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0D8F87] shrink-0 mt-0.5" />
                <span>1204 Valley Pasture Rd, Green Ridge Farm State</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#18B6A6] shrink-0" />
                <span>+1 (800) 456-DAIRY</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F7C948] shrink-0" />
                <span>info@dairyfarmpro.com</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Weekly Digest</h4>
            <p className="text-xs text-slate-400">
              Subscribe for farm fresh product discounts, health tips, and harvest reports.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#0D8F87]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#0D8F87] text-white hover:bg-[#18B6A6] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Dairy Farm Management System. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for organic agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
