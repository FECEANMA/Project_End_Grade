// src/components/Toast.js
import React, { useEffect, useState } from 'react';
import './Toast.css'; // Importamos estilos

const Toast = ({ message, type = 'info', onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const autoClose = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(autoClose);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(onClose, 500); // Espera animación antes de quitarlo
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  const toastClass = `toast ${type} ${visible ? 'toast-show' : 'toast-hide'}`;

  return (
    <div className={toastClass}>
      {message}
    </div>
  );
};

export default Toast;
