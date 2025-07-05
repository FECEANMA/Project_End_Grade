// src/components/Monitor.js
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { CircularProgressbar } from 'react-circular-progressbar';  
import 'react-circular-progressbar/dist/styles.css';  


const Monitor = () => {
  const [energyData, setEnergyData] = useState(null);

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const response = await axios.get('/energy/monitor');
        setEnergyData(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchEnergyData(); // Llamada inicial para obtener datos
      // Intervalo de actualización cada 2 segundos
    const interval = setInterval(fetchEnergyData, 2000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);
 // Función para calcular el porcentaje del círculo de progreso
  const calculatePercentage = (value, max) => {
    return Math.min((value / max) * 100, 100); // Asegura que no sea más de 100%
  };
  return (
    <div className="monitor-container">
      <h2>Monitoreo de Energía</h2>
      {energyData ? (
        <div className='progress-row'>
          {/* Contenedor de Voltaje */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.voltage, 240)} // Asumimos que 240V es el máximo
              text={`${energyData.voltage} V`}
              styles={{
                path: { stroke: '#4caf50' },
                text: { fill: '#4caf50', fontSize: '16px' },
              }}
            />
            <h3 style={{color: '#4caf50'}}>Voltaje</h3>
          </div>

          {/* Contenedor de Corriente */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.current, 10)} // Asumimos 10A como máximo
              text={`${energyData.current} A`}
              styles={{
                path: { stroke: '#ff9800' },
                text: { fill: '#ff9800', fontSize: '16px' },
              }}
            />
            <h3 style={{color: '#ff9800'}}>Corriente</h3>
          </div>

          {/* Contenedor de Potencia */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.power, 2000)} // Asumimos 2000W como máximo
              text={`${energyData.power} W`}
              styles={{
                path: { stroke: '#2196f3' },
                text: { fill: '#2196f3', fontSize: '16px' },
              }}
            />
            <h3 style={{color: '#2196f3'}}>Potencia</h3>
          </div>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Monitor;
