-- ARCHIVO PARA SCRIPT SQL PARA CONEXION BASE DE DATOS
-- Ronny Abreu

CREATE DATABASE IF NOT EXISTS visitor_management;

USE visitor_management;

CREATE TABLE visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    sobre_mi VARCHAR(55) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1
);

INSERT INTO visitors (nombre, apellido, telefono, email, sobre_mi) 
VALUES ('Admin', 'Sistema', '0000000000', 'admin@visitorflow.com', 'Administrador del sistema');