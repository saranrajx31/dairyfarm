import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md text-white font-medium ${
              toast.type === 'success'
                ? 'bg-[#0D8F87]/95 border-[#18B6A6]'
                : toast.type === 'error'
                ? 'bg-rose-600/95 border-rose-400'
                : 'bg-slate-800/95 border-slate-600'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#F7C948] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-200 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-teal-200 shrink-0" />}
            <span className="text-sm flex-1">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
