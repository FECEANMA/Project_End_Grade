// src/App.js
import React, { useState, useEffect } from 'react';
import Monitor from './components/Monitor';
import OverloadHistory from './components/OverloadHistory';
import './App.css'; // Importing CSS for styling
import { FaTachometerAlt, FaHistory } from 'react-icons/fa'; // Icons for navigation
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

   useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  
   if (!isAuthenticated) {
    return showRegister ? (
      <div className="App">
        <Register />
        <button className='delete-button' onClick={() => setShowRegister(false)}>¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    ) : (
      <div className="App">
        <Login onLogin={() => setIsAuthenticated(true)} />
        <button className='delete-button' onClick={() => setShowRegister(true)}>¿No tienes Cuenta? Registrate, es Gratis</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="delete-icon-block">
          <button
            className="delete-icon-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <h1>Guardian de Regleta Inteligente</h1>
      </header>

      <main className="App-main">
        {activeTab === 'monitor' && <Monitor />}
        {activeTab === 'history' && <OverloadHistory />}
      </main>

      <nav className="App-nav">
        <button
          className={activeTab === 'monitor' ? 'active' : ''}
          onClick={() => setActiveTab('monitor')}
        >
          <FaTachometerAlt /> Monitoreo
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> Historial
        </button>
      </nav>
    </div>
  );
};

export default App;
