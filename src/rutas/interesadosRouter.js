import express from "express";
import {crear, buscar, buscarId, actualizar, eliminar} from "../controladores/interesadosControler.js";

const routerInteresados = express.Router();

//Definir rutas
routerInteresados.get('/', (req, res) =>{
    res.send('Hola sitio de Interesados');
});

routerInteresados.post('/crear', (req, res) =>{
    //res.send('Crear Interesados');
    crear(req,res);
});

routerInteresados.get('/buscar', (req, res) =>{
    //res.send('Buscar Interesados');
    buscar(req,res);
});

routerInteresados.get('/buscarId/:id', (req, res) =>{
    //res.send('Buscar Interesados');
    buscarId(req,res);
});

routerInteresados.put('/actualizar/:id', (req, res) =>{
    //res.send('actualizar Interesados');
    actualizar(req,res);
});

routerInteresados.delete('/eliminar/:id', (req, res) =>{
    //res.send('eliminar Interesados');
    eliminar(req,res);
});

export {routerInteresados};