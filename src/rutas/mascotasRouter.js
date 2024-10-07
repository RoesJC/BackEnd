import express from "express";
import {crear, buscar, buscarId, actualizar, eliminar} from "../controladores/mascotasControler.js";

const routerMascota = express.Router();

//Definir rutas
routerMascota.get('/', (req, res) =>{
    res.send('Hola sitio de mascotas');
});

routerMascota.post('/crear', (req, res) =>{
    //res.send('Crear mascotas');
    crear(req,res);
});

routerMascota.get('/buscar', (req, res) =>{
    //res.send('Buscar mascotas');
    buscar(req,res);
});

routerMascota.get('/buscarId/:id', (req, res) =>{
    //res.send('Buscar mascotas');
    buscarId(req,res);
});

routerMascota.put('/actualizar/:id', (req, res) =>{
    //res.send('actualizar mascotas');
    actualizar(req,res);
});

routerMascota.delete('/eliminar/:id', (req, res) =>{
    //res.send('eliminar mascotas');
    eliminar(req,res);
});

export {routerMascota};