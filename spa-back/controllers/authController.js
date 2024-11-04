import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, role, direccion, documentoIdentidad, telefono } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !apellido || !email || !contraseña || !direccion || !documentoIdentidad || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Crear el usuario si pasa las validaciones
    const nuevoUsuario = await User.create({
      nombre,
      apellido,
      email,
      contraseña,
      role,
      direccion,
      documentoIdentidad,
      telefono
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
};


// Inicio de sesión
export const iniciarSesion = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await User.findOne({ where: { email, contraseña } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({
      id: usuario.id,
      nombre: usuario.nombre,
      role: usuario.role, // Incluye el rol en la respuesta
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};