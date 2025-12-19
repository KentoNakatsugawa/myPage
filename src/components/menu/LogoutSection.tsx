'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutSectionProps {
  onLogout: () => void;
}

export default function LogoutSection({ onLogout }: LogoutSectionProps) {
  return (
    <section className="pt-4 border-t border-gray-200">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onLogout}
        className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
      >
        <LogOut className="w-5 h-5 text-red-500" />
        <span className="text-sm font-medium text-red-500">ログアウト</span>
      </motion.button>
    </section>
  );
}
