'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NorelState, UserProfile, AlertType } from '@/types';

interface NorelContextType extends NorelState {
  login: () => void;
  logout: () => void;
  nextStep: () => void;
  setStep: (step: number) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setAlertType: (alert: AlertType) => void;
  clearAlert: () => void;
}

const defaultUserProfile: UserProfile = {
  name: '山田 太郎',
  email: 'taro.yamada@example.com',
  phone: '090-1234-5678',
  address: '東京都渋谷区神南1-2-3',
  zipCode: '150-0041',
  company: '株式会社サンプル',
  companyPhone: '03-1234-5678',
  licenseExpiry: '2025-03-15',
  insuranceExpiry: '2025-06-01',
  shakenExpiry: '2025-12-01',
};

const defaultState: NorelState = {
  isAuthenticated: false,
  currentStep: 1,
  norelScore: 750,
  isMenuOpen: false,
  userProfile: defaultUserProfile,
  paymentInfo: {
    nextPaymentDate: '1月5日',
    amount: 39800,
  },
  vehicleInfo: {
    name: 'トヨタ プリウス',
    estimatedValue: 1450000,
    recommendationLevel: 5,
  },
  alertType: null,
};

const NorelContext = createContext<NorelContextType | undefined>(undefined);

export function NorelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NorelState>(defaultState);

  const login = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: false, currentStep: 1 }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 8),
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, 8)),
    }));
  }, []);

  const toggleMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const closeMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMenuOpen: false }));
  }, []);

  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...profile },
    }));
  }, []);

  const setAlertType = useCallback((alert: AlertType) => {
    setState((prev) => ({ ...prev, alertType: alert }));
  }, []);

  const clearAlert = useCallback(() => {
    setState((prev) => ({ ...prev, alertType: null }));
  }, []);

  return (
    <NorelContext.Provider
      value={{
        ...state,
        login,
        logout,
        nextStep,
        setStep,
        toggleMenu,
        closeMenu,
        updateProfile,
        setAlertType,
        clearAlert,
      }}
    >
      {children}
    </NorelContext.Provider>
  );
}

export function useNorel() {
  const context = useContext(NorelContext);
  if (context === undefined) {
    throw new Error('useNorel must be used within a NorelProvider');
  }
  return context;
}
