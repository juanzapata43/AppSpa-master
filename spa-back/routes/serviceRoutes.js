import express from 'express';
import { obtenerServicios, obtenerServicioPorId } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', obtenerServicios);             // Obtener todos los servicios
router.get('/:id', obtenerServicioPorId);      // Obtener un servicio por ID

export default router;
