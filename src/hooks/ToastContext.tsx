import  { createContext, useState, ReactNode, useContext } from "react";
import { AnimatedList } from "../components/ui/animated-list";
import { AnimatedListDemo } from "../components/shared/toast/toast";


interface ToastData {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

interface ToastContextType {
  showToast: (toastData: ToastData) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);


export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData | null>(null);

  const showToast = (toastData: ToastData) => {
    setToastData(toastData);

    setTimeout(() => {
      setToastData(null);
    }, parseFloat(toastData.time) * 1000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}


      {toastData && (
        <div className="w-1/2 absolute top-0 left-0">
          <AnimatedList>
            <AnimatedListDemo
              name={toastData.name}
              description={toastData.description}
              icon={toastData.icon}
              color={toastData.color}
              time={toastData.time}
            />
          </AnimatedList>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
