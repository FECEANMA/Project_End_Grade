// src/App.js
import React, { useState, useEffect } from 'react';
import Monitor from './components/Monitor';
import OverloadHistory from './components/OverloadHistory';
import './App.css'; // Importing CSS for styling
import { FaTachometerAlt, FaHistory, FaUserCircle, FaCog, FaBell } from 'react-icons/fa'; // Icons for navigation
import Settings from './components/Settings'; 
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
  // Forzar logout en cada inicio
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  setUsername('');
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setActiveTab('monitor'); 
    setUsername('');
  };
  
   if (!isAuthenticated) {
    return showRegister ? (
      <div className="App">
        <Register />
        <button className='delete-button' onClick={() => setShowRegister(false)}>¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    ) : (
      <div className="App">
        <Login onLogin={() => {
  const token = localStorage.getItem('token');
  setIsAuthenticated(true);
  const payload = JSON.parse(atob(token.split('.')[1]));
  setUsername(payload.username); 
  setActiveTab('monitor'); 
}} />
        <button className='delete-button' onClick={() => setShowRegister(true)}>¿No tienes Cuenta? Registrate, es Gratis</button>
      </div>
    );
  }
  

  return (
    <div className="App">
      <header className="App-header">
  <div className="header-left">
    <FaUserCircle size={24} style={{ marginRight: '8px' }} />
    <span>{username}</span>
  </div>

  <h1>Guardian de Regleta Inteligente</h1>

  <div className="header-right">
    <button className="icon-button" onClick={() => setActiveTab('notifications')}>
      <FaBell />
    </button>
    <button className="icon-button" onClick={() => setActiveTab('settings')}>
      <FaCog />
    </button>
  </div>
</header>

      <main className="App-main">
  {activeTab === 'monitor' && <Monitor />}
  {activeTab === 'history' && <OverloadHistory />}
  {activeTab === 'settings' && <Settings onLogout={handleLogout} />}
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
