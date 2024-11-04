import React, { useState } from 'react';
import './Login.css';
import { urlApi } from '../api/apiService';
import { Link } from 'react-router-dom';
import { errorRedireccion, redireccion } from '../utils/sweetAlert';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setPassword] = useState('');
    let auth = useNavigate()

    async function iniciarSesion() {
        try {
            const response = await fetch(urlApi.apiUsuariosLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contraseña }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); // Guarda el objeto de usuario completo
                auth('/reserva'); // Redirige al formulario de reserva
            } else {
                errorRedireccion()
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    }

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
                <h2>Bienvenido</h2>
                <section className='content__form__inputs'>
                    <input
                        placeholder='Correo Electrónico'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder='Contraseña'
                        type="password"
                        value={contraseña}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                <button onClick={iniciarSesion} type='button'>Ingresar</button>
                <Link to="/register">¿No tienes una cuenta? <span>Regístrate</span></Link>
            </form>
        </section>
    );
};

export default Login;
