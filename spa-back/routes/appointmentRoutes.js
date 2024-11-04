import express from 'express';
import { crearCita, obtenerCitas, actualizarCita, eliminarCita } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', crearCita);             // Crear una nueva cita
router.get('/', obtenerCitas);           // Obtener todas las citas
router.put('/:id', actualizarCita);      // Actualizar una cita existente
router.delete('/:id', eliminarCita);     // Eliminar una cita

export default router;
