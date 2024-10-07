import { Interesados } from "../modelos/interesadosModelo.js";

//Crear un recurso mascota
const crear = (req,res) => {
    //Validar
    if(!req.body.nombre){
        res.status(400).send({
            mensaje: "El nombre no puede estar vació."
        });
        return;
    }

    const dataset = {
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono
    }
    
    //Usar Sequelize para crear el recurso en la base de datos
    Interesados.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de interesados creado con éxito"
        });
    }).catch((err) =>{
        res.status(500).json({
            mensaje: `Registro de interesados no creado ::: ${err}`
        });
    });
}

//Usar Sequelize para eliminar una mascota en la base de datos
const eliminar= (req,res)=>{

    const id = req.params.id;
    if(id==null){
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    }else{
        Interesados.destroy({
            where: { interesId: id }
        })
        .then((resultado) => {
            if (resultado) {
                res.status(200).json({
                    mensaje: `Interesado con id ${id} eliminado exitosamente.`
                });
            } else {
                res.status(404).json({
                    mensaje: `No se encontró interesado con id ${id}.`
                });
            }
        }).catch((err) => {
            res.status(500).json({
                mensaje: `Error eliminando el registro: ${err}`
            });
        });   
    };
}

//Buscar interesados
const buscar= (req,res)=>{
    Interesados.findAll().then((resultado)=>{
        res.status(200).json(resultado);
    }).catch((err)=>{
        res.status(500).json({
            mensaje:`No se encontraron registros ::: ${err}`
        });
    });
}

//buscar por ID
const buscarId= (req,res)=>{

    const id=req.params.id;
    if(id==null){
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    }
    else{
        Interesados.findByPk(id).then((resultado)=>{
            res.status(200).json(resultado);
        }).catch((err)=>{
            res.status(500).json({
                mensaje:`No se encontraron registros ::: ${err}`
            });
        });

    }
    
}

// Actualizar interesados
const actualizar = (req, res) => {
    const id = req.params.id;

    // Verificar si alguno de los campos es válido para actualizar
    if (!req.body.nombre && !req.body.cedula && !req.body.telefono) {
        return res.status(400).json({
            mensaje: "No se encontraron datos para actualizar"
        });
    }

    // Extraer los datos del cuerpo de la solicitud
    const { nombre, cedula, telefono } = req.body;

    // Construir el objeto de actualización
    const dataset = {};
    if (nombre !== undefined) dataset.nombre = nombre;
    if (cedula !== undefined) dataset.cedula = cedula;
    if (telefono !== undefined) dataset.telefono = telefono;

    // Actualizar el registro
    Interesados.update(dataset, { where: { interesId: id } })
        .then((resultado) => {
            if (resultado[0] === 0) {
                return res.status(404).json({
                    tipo: 'error',
                    mensaje: `No se encontró un interesado con id ${id}`
                });
            } else {
                return res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro actualizado correctamente"
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro ::: ${err}`
            });
        });
};


export{crear, eliminar, buscar, buscarId, actualizar};