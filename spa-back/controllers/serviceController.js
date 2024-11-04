import Service from '../models/Service.js';

// Obtener todos los servicios
export const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Service.findAll();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener servicios' });
  }
};

// Obtener un servicio por ID
export const obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Service.findByPk(req.params.id);
    if (servicio) {
      res.status(200).json(servicio);
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener servicio' });
  }
};
