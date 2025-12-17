'use client';

import { useNorel } from '@/contexts/NorelContext';
import { LoginPage, Dashboard } from '@/components';

export default function Home() {
  const { isAuthenticated } = useNorel();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}
