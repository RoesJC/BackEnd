import express from "express";
import {crear, buscar, buscarId, actualizar, eliminar} from "../controladores/solicitudControler.js";

const routerSolicitud = express.Router();

//Definir rutas
routerSolicitud.get('/', (req, res) =>{
    res.send('Hola sitio de mascotas');
});

// routerSolicitud.post('/crear', (req, res) =>{
//     //res.send('Crear Solicitud');
//     crear(req,res);
// });

// routerSolicitud.get('/buscar', (req, res) =>{
//     //res.send('Buscar Solicitud');
//     buscar(req,res);
// });

// routerSolicitud.get('/buscarId/:id', (req, res) =>{
//     //res.send('Buscar Solicitud');
//     buscarId(req,res);
// });

// routerSolicitud.put('/actualizar/:id', (req, res) =>{
//     //res.send('actualizar Solicitud');
//     actualizar(req,res);
// });

// routerSolicitud.delete('/eliminar/:id', (req, res) =>{
//     //res.send('eliminar Solicitud');
//     eliminar(req,res);
// });

routerSolicitud.post('/crear', crear);
routerSolicitud.get('/buscar', buscar);
routerSolicitud.get('/buscarId/:id', buscarId);
routerSolicitud.put('/actualizar/:id', actualizar);
routerSolicitud.delete('/eliminar/:id', eliminar);

export {routerSolicitud};