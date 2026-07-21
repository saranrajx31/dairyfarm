import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { X, Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin@dairyfarm.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const { setCurrentView, showToast } = useApp();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          showToast('Welcome back! Signed in to Dairy Farm Admin', 'success');
          setCurrentView('dashboard');
          onClose();
        } else {
          showToast('Invalid credentials provided', 'error');
        }
      } else {
        const success = await signup(email, password, name || 'Farm Admin');
        if (success) {
          showToast('Account created successfully! Redirecting to Dashboard', 'success');
          setCurrentView('dashboard');
          onClose();
        } else {
          showToast('Registration failed', 'error');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-teal-100 dark:border-teal-900/40 p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-[#0D8F87] flex items-center justify-center text-2xl font-bold">
              🐄
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dairy Farm Management Portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#0D8F87] dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dairyfarm.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#0D8F87] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#0D8F87] dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 mt-2 rounded-xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-sm shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-[#0D8F87] dark:text-[#18B6A6] font-medium hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already registered? Sign In'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
