import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PanelAdmin.css';

const PanelAdmin = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/appointments');
        const data = await response.json();
        setCitas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener citas:', error);
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <div className="admin-panel">
      <Link to={'/'}>Cerrar Sesión</Link>
      <h2>Panel de Control - Citas Reservadas</h2>
      {loading ? (
        <p>Cargando citas...</p>
      ) : (
        <div className="cards-container">
          {citas.length > 0 ? (
            citas.map((cita) => (
              <div className="card" key={cita.id}>
                <h3>Cita #{cita.id}</h3>
                <p>Fecha: {cita.fecha}</p>
                <p>Hora: {cita.hora}</p>
                <p>Cliente: {cita.User ? `${cita.User.nombre} ${cita.User.apellido}` : 'Sin Cliente'}</p>
                <p>Servicio: {cita.Service ? cita.Service.nombre : 'Sin Servicio'}</p>
                <p>Estado: {cita.estado}</p>
              </div>
            ))
          ) : (
            <p>No hay citas registradas</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PanelAdmin;
