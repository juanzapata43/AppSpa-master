import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Service from './Service.js';

const Appointment = sequelize.define('Appointment', {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service,
            key: 'id',
        },
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
    },
}, {
    freezeTableName: true,
});

// Configura las asociaciones
User.hasMany(Appointment, { foreignKey: 'userId' });
Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

export default Appointment;
