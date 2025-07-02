// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const isValidEmail = (email) => {
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const domain = parts[1].toLowerCase();
  return allowedDomains.includes(domain);
};

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!isValidEmail(email)) {
    alert('El correo debe ser @gmail.com, @hotmail.com, @outlook.com o similar');
    return;
  }

    try {
      await axios.post('http://localhost:4000/auth/register', {
        username,
        email,
        password,
      });
      alert('Registro exitoso. Ya puedes iniciar sesión.');
    } catch (err) {
      alert('Error al registrar: ' + (err.response?.data?.message || 'Error desconocido'));
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
    </div>
  );
};

export default Register;
