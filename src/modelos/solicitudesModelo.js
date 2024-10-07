// models/solicitudesModelo.js
import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Solicitudes = db.define("solicitudes", {
    solicitudId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: 'pendiente',
        allowNull: true
    },
    mascotasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'mascotas', // Nombre de la tabla en minúsculas
            key: 'mascotasId'
        }
    },

    interesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'interesados', // Nombre de la tabla en minúsculas
            key: 'interesId'
        }
    },

    fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: "solicitudes",
    freezeTableName: true,
    timestamps: true
});

export { Solicitudes };

