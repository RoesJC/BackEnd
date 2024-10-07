// models/interesadosModelo.js
import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Interesados = db.define("interesados", {
    interesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cedula: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

}, {
    tableName: "interesados",
    freezeTableName: true
});

export { Interesados };
