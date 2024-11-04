import sequelize from './config/db.js';

const createTables = async () => {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        role ENUM('cliente', 'administrador') DEFAULT 'cliente'
      );
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Services (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        duracion INT NOT NULL,
        precio FLOAT NOT NULL
      );
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Appointments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fecha DATE NOT NULL,
        hora TIME NOT NULL,
        estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
        userId INT,
        serviceId INT,
        FOREIGN KEY (userId) REFERENCES Users(id),
        FOREIGN KEY (serviceId) REFERENCES Services(id)
      );
    `);

    console.log('Tablas creadas manualmente en la base de datos.');
  } catch (error) {
    console.error('Error al crear las tablas manualmente:', error);
  } finally {
    await sequelize.close();
  }
};

createTables();
