import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { urlApi } from '../api/apiService'; // Asegúrate de que esta ruta apunte a tu archivo de configuración de la API
import { errorRedireccion, redireccion } from '../utils/sweetAlert';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);
  let auth = useNavigate()

  const handleRegister = async () => {
    if (!nombre || !apellido || !email || !contraseña || !direccion || !documentoIdentidad || !telefono) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const userData = {
      nombre,
      apellido,
      email,
      contraseña,
      direccion,
      documentoIdentidad,
      telefono,
      role: 'cliente'
    };

    try {
      const response = await fetch(urlApi.apiUsuariosRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {

        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);
        redireccion(auth)
      } else {
        errorRedireccion()
        const errorData = await response.json();
        setError(errorData.error || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error en la conexión al servidor');
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
        <h2>Bienvenido</h2>
        <section className='content__form__inputs'>
          <input
            placeholder='Nombre'
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            placeholder='Apellido'
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            placeholder='Contraseña'
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <input
            placeholder='Correo Electrónico'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Dirección'
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            placeholder='Documento de Identidad'
            type="text"
            value={documentoIdentidad}
            onChange={(e) => setDocumentoIdentidad(e.target.value)}
          />
          <input
            placeholder='Teléfono'
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </section>
        {error && <p className="error-message">{error}</p>}
        <button type='button' onClick={handleRegister}>Registrarse</button>
        <Link to="/">¿Ya tienes una cuenta? <span>Login</span></Link>
      </form>
    </section>
  );
};

export default Register;
