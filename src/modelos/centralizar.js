// models/index.js
import { db } from "../database/conexion.js";
import { Mascotas } from "./mascotasModelo.js";
import { Interesados } from "./interesadosModelo.js";
import { Solicitudes } from "./solicitudesModelo.js";

// Definir Asociaciones
Mascotas.hasMany(Solicitudes, {
    foreignKey: 'mascotasId',
    as: 'solicitudes',
    onDelete: 'CASCADE'
});

Interesados.hasMany(Solicitudes, {
    foreignKey: 'interesId',
    as: 'solicitudes',
    onDelete: 'CASCADE'
});

Solicitudes.belongsTo(Mascotas, {
    foreignKey: 'mascotasId',
    as: 'mascota',
    onDelete: 'CASCADE'
});

Solicitudes.belongsTo(Interesados, {
    foreignKey: 'interesId',
    as: 'interesado',
    onDelete: 'CASCADE'
});

// Exportar Todos los Modelos
export {
    Mascotas,
    Interesados,
    Solicitudes
};
