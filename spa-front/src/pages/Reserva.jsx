import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlApi } from '../api/apiService';

import './Reserva.css';

const Reserva = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios
    const navigate = useNavigate();

    // Obtener los servicios cuando el componente se monta
    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await fetch(urlApi.apiServicios);
                const data = await response.json();
                setServicios(data); // Almacena los servicios en el estado
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        fetchServicios();
    }, []);

    const handleReserva = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? parseInt(user.id, 10) : null;

        if (!userId || !servicioId) {
            console.error('No hay usuario autenticado o el servicio no ha sido seleccionado');
            return;
        }

        const reservaData = {
            fecha,
            hora,
            serviceId: parseInt(servicioId, 10), // Usa serviceId en lugar de servicioId
            userId,
        };

        console.log('Datos que se envían al backend:', reservaData);

        try {
            const response = await fetch('http://localhost:3000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Asegúrate de que Content-Type sea JSON
                },
                body: JSON.stringify(reservaData),
            });

            const responseData = await response.json();
            if (response.ok) {
                console.log('Reserva realizada exitosamente');
                navigate('/admin');
            } else {
                console.error('Error al realizar la reserva:', responseData);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    };

    return (
        <section className='content'>
            <div className='content__header'>
                <img src="/public/logo.jpeg" alt="" />
                <section>
                    <h2>Naty Natural Massage</h2>
                    <p>Belleza y Bienestar que renueva</p>
                </section>
            </div>
            <form className='content__form' onSubmit={(e) => e.preventDefault()}>
            <button type='button'><Link to={'/'}>Volvler al Login</Link></button>
                <h2>Reservar un Servicio</h2>
                <section className='content__form__inputs'>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                    <select
                        value={servicioId}
                        onChange={(e) => setServicioId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un servicio</option>
                        {servicios.map((servicio) => (
                            <option key={servicio.id} value={servicio.id}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </select>
                </section>
                <button type='button' onClick={handleReserva}>Agendar</button>
            </form>
        </section>
    );
};

export default Reserva;
