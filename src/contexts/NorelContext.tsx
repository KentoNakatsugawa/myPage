'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { NorelState, UserProfile, AlertType } from '@/types';
import { defaultNorelState } from '@/mocks';
import { norelReducer } from './norelReducer';

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

const NorelContext = createContext<NorelContextType | undefined>(undefined);

export function NorelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(norelReducer, defaultNorelState);

  const login = useCallback(() => {
    dispatch({ type: 'LOGIN' });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const setStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const toggleMenu = useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, []);

  const closeMenu = useCallback(() => {
    dispatch({ type: 'CLOSE_MENU' });
  }, []);

  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  }, []);

  const setAlertType = useCallback((alert: AlertType) => {
    dispatch({ type: 'SET_ALERT', payload: alert });
  }, []);

  const clearAlert = useCallback(() => {
    dispatch({ type: 'CLEAR_ALERT' });
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
