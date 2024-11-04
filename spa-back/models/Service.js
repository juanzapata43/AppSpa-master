import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false, // Duración en minutos
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

export default Service;
