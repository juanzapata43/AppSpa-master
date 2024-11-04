import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

// Crear una nueva cita
export const crearCita = async (req, res) => {
    try {
        const { fecha, hora, serviceId, userId } = req.body;

        console.log('Datos completos recibidos en el backend:', req.body); // Revisa el contenido de req.body
        console.log('Tipos - serviceId:', typeof serviceId, 'userId:', typeof userId); // Verifica los tipos de datos

        if (!serviceId || !userId) {
            console.log('serviceId o userId no están presentes o son nulos.');
            return res.status(400).json({ error: 'El servicio y el usuario son obligatorios' });
        }

        const nuevaCita = await Appointment.create({
            fecha,
            hora,
            serviceId,
            userId,
        });

        res.status(201).json(nuevaCita);
    } catch (error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ error: 'Error al crear la cita en el servidor' });
    }
};



// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
    try {
        const citas = await Appointment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nombre', 'apellido'], // Ajusta los atributos necesarios
                },
                {
                    model: Service,
                    attributes: ['nombre'], // Ajusta los atributos necesarios
                }
            ]
        });

        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ error: 'Error al obtener citas' });
    }
};

// Actualizar una cita
export const actualizarCita = async (req, res) => {
    try {
        const cita = await Appointment.findByPk(req.params.id);
        if (cita) {
            await cita.update(req.body);
            res.status(200).json(cita);
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar cita' });
    }
};

// Eliminar una cita
export const eliminarCita = async (req, res) => {
    try {
        const cita = await Appointment.findByPk(req.params.id);
        if (cita) {
            await cita.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar cita' });
    }
};
