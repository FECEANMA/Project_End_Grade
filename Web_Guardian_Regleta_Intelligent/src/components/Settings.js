// src/components/Settings.js
import React from 'react';
import axios from '../components/axiosConfig';

const Settings = ({ onLogout }) => {

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirm) return;

    try {
      await axios.delete('/auth/delete'); // Este endpoint debe existir en el backend
      localStorage.removeItem('token');
      onLogout();
    } catch (error) {
      alert('Error al eliminar la cuenta');
    }
  };

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Ajustes</h2>
      <button className="delete-button" onClick={onLogout}>Cerrar Sesión</button>
      <br />
      <button className="delete-button" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
    </div>
  );
};

export default Settings;
