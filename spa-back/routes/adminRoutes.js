import express from 'express';
import { crearServicio, actualizarServicio, eliminarServicio, obtenerDisponibilidad } from '../controllers/adminController.js';

const router = express.Router();

router.post('/servicios', crearServicio);       // Crear un nuevo servicio
router.put('/servicios/:id', actualizarServicio); // Actualizar un servicio existente
router.delete('/servicios/:id', eliminarServicio); // Eliminar un servicio
router.get('/disponibilidad', obtenerDisponibilidad); // Ver disponibilidad de citas

export default router;
