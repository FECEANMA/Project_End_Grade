// src/components/Settings.js
import React, { useState } from 'react';
import axios from '../components/axiosConfig';
import Toast from './Toast';


const Settings = ({ onLogout }) => {
  const [toast, setToast] = useState(null);


  const handleDeleteAccount = async () => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirm) return;

    try {
      await axios.delete('/auth/delete'); 
      localStorage.removeItem('token');
      setToast({ message: 'Cuenta eliminada', type: 'success' });
      onLogout();
    } catch (error) {
      setToast({ message: 'Error al eliminar la cuenta', type: 'error' });
    }
  };

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Ajustes</h2>
      <button className="delete-button" onClick={onLogout}>Cerrar Sesión</button>
      <br />
      <button className="delete-button" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Settings;
