import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextProps {
  showToast: boolean;
  openToast: () => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);

  const openToast = () => {
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, openToast, closeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
