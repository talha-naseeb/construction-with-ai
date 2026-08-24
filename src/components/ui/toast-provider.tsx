'use client';

import { createContext, useContext, useState } from 'react';

type ToastType = 'success' | 'error';
type ToastContextValue = { showToast: (message: string, type?: ToastType) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  function showToast(message: string, type: ToastType = 'success') {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3500);
  }
  return <ToastContext.Provider value={{ showToast }}>{children}{toast && <div className={`toast ${toast.type}`} role="status">{toast.message}</div>}</ToastContext.Provider>;
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast must be used inside ToastProvider.');
  return value;
}
