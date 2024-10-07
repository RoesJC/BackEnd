// models/mascotasModelo.js
import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Mascotas = db.define("mascotas", {
    mascotasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: true
    },
    raza: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

}, {
    tableName: "mascotas",
    freezeTableName: true
});

export { Mascotas };

