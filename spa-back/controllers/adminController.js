import Service from '../models/Service.js';
import Appointment from '../models/Appointment.js';

// Crear un nuevo servicio (masaje)
export const crearServicio = async (req, res) => {
  try {
    const nuevoServicio = await Service.create(req.body);
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el servicio' });
  }
};

// Actualizar un servicio existente
export const actualizarServicio = async (req, res) => {
  try {
    const servicio = await Service.findByPk(req.params.id);
    if (servicio) {
      await servicio.update(req.body);
      res.status(200).json(servicio);
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el servicio' });
  }
};

// Eliminar un servicio
export const eliminarServicio = async (req, res) => {
  try {
    const servicio = await Service.findByPk(req.params.id);
    if (servicio) {
      await servicio.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el servicio' });
  }
};

// Ver disponibilidad de citas
export const obtenerDisponibilidad = async (req, res) => {
  try {
    const citas = await Appointment.findAll();
    res.status(200).json(citas);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener disponibilidad de citas' });
  }
};
