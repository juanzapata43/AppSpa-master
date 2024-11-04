import express from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registrarUsuario); // Registro de usuario
router.post('/login', iniciarSesion);       // Inicio de sesión

export default router;
