// src/components/Register.js
import React, { useState } from 'react';
import axios from './axiosConfig';
import Toast from './Toast';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toast, setToast] = useState(null);


  const isValidEmail = (email) => {
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const domain = parts[1].toLowerCase();
  return allowedDomains.includes(domain);
};

  const handleRegister = async () => {
    if (!username || !password || !repeatPassword || !email) {
      setToast({ message: 'Todos los campos son obligatorios', type: 'error' });
  return;
}

if (password.length < 6) {
      setToast({ message: 'La contraseña debe tener al menos 6 caracteres', type: 'error' });
  return;
}

    if (password !== repeatPassword) {
      setToast({ message: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }

    if (!isValidEmail(email)) {
      setToast({ message: 'El correo debe ser @gmail.com, @hotmail.com, @outlook.com o similar', type: 'error' });
    return;
  }

    try {
      await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      setToast({ message: 'Registro exitoso. Ya puedes iniciar sesión.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Error al registrar: ' + (err.response?.data?.message || 'Error desconocido'), type: 'error' });
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="Repetir Contraseña"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrarse</button>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Register;
