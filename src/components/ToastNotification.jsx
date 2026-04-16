import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import './ToastNotification.css';

const ToastNotification = () => {
  const { toasts } = useContext(AppContext);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} animate-slide-up`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
          </div>
          <p className="toast-message">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastNotification;
