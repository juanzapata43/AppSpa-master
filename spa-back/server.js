import express from 'express';
import adminRoutes from './routes/adminRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import sequelize from './config/db.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log('Middleware - Cuerpo de la solicitud:', req.body);
    next();
});
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida exitosamente.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

sequelize.sync()
    .then(() => {
        console.log('Conexión establecida y tablas sincronizadas.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });


// Resto de la configuración de Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
