// src/components/OverloadHistory.js
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { FaTrash } from 'react-icons/fa';

const OverloadHistory = () => {
  const [overloads, setOverloads] = useState([]);

  useEffect(() => {
    const fetchOverloads = async () => {
      try {
        const response = await axios.get('/energy/history');
        setOverloads(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de sobrecargas:', error);
      }
    };

    fetchOverloads();
    // Intervalo de actualización cada 5 segundos
    const interval = setInterval(fetchOverloads, 5000);
    
    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

const handleDeleteHistory = async () => {
  const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar todo el historial?');
  if (!confirmDelete) return;

  try {
    await axios.delete('/energy/history');
    setOverloads([]);
    alert('Historial de sobrecargas eliminado');
  } catch (error) {
    console.error('Error al eliminar el historial:', error);
  }
};

const handleDeleteSingle = async (id) => {
  const confirmDelete = window.confirm('¿Deseas eliminar solo esta entrada del historial?');
  if (!confirmDelete) return;

  try {
    await axios.delete(`/energy/history/${id}`);
    setOverloads((prev) => prev.filter((entry) => entry.id !== id));
  } catch (error) {
    console.error('Error al eliminar la entrada del historial:', error);
    alert('Ocurrió un error al eliminar esta entrada.');
  }
};

  return (
    <div>
      <h2>Historial de Energia</h2>
      {overloads.length === 0 ? (
        <p>No hay sobrecargas registradas.</p>
      ) : (
        <div>
          <div>
  <button className='delete-button' onClick={handleDeleteHistory}>Eliminar Historial</button>
</div>
          <div className="history-cards">
  {overloads.map((overload) => (
    <div className="history-card" key={overload.id}>
      <div className="card-header">
        <span>{new Date(overload.timestamp).toLocaleString()}</span>
      </div>
      <div className="card-body">
        <p><strong>Voltaje:</strong> {overload.voltage} V</p>
        <p><strong>Corriente:</strong> {overload.current} A</p>
        <p><strong>Potencia:</strong> {overload.power} W</p>
        <p><strong>Estado:</strong> {overload.status}</p>
        <div className="delete-icon-block">
          <button
            className="delete-icon-button" onClick={() => handleDeleteSingle(overload.id)}>
              <FaTrash />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
      )}
    </div>
  );
};

export default OverloadHistory;
