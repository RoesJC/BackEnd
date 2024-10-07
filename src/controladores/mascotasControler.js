import { Mascotas } from "../modelos/mascotasModelo.js";

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
        sexo: req.body.sexo,
        tipo:req.body.tipo,
        raza: req.body.raza,
        edad: req.body.edad
    }
    
    //Usar Sequelize para crear el recurso en la base de datos
    Mascotas.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de mascota creado con éxito"
        });
    }).catch((err) =>{
        res.status(500).json({
            mensaje: `Registro de mascota no creado ::: ${err}`
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
        Mascotas.destroy({
            where: { mascotasId: id }
        })
        .then((resultado) => {
            if (resultado) {
                res.status(200).json({
                    mensaje: `Mascota con id ${id} eliminada exitosamente.`
                });
            } else {
                res.status(404).json({
                    mensaje: `No se encontró una mascota con id ${id}.`
                });
            }
        }).catch((err) => {
            res.status(500).json({
                mensaje: `Error eliminando el registro: ${err}`
            });
        });   
    };
}

//Buscar Mascotas
const buscar= (req,res)=>{
    Mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);
    }).catch((err)=>{
        res.status(500).json({
            mensaje:`No se encontraron registros ::: ${err}`
        });
    });
}

// Buscar Mascota por ID
const buscarId = (req, res) => {

    const id = req.params.id;

    // Verificar si el ID es válido
    if (!id) {
        return res.status(400).json({
            mensaje: "El id no puede estar vacío"
        });
    }

    // Usar el nombre correcto del modelo 'mascotas'
    Mascotas.findByPk(id).then((resultado) => {
        if (resultado) {
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({
                mensaje: `No se encontró mascota con id ${id}`
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            mensaje: `Error al buscar mascota ::: ${err}`
        });
    });
}


//Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;

    // Verificar si hay datos para actualizar
    if (!req.body.nombre && !req.body.raza && !req.body.tipo && !req.body.sexo && !req.body.edad) {
        res.status(400).json({
            mensaje: "No se encontraron Datos para Actualizar"
        });
        return;
    } else {
        const { nombre, raza, tipo, sexo, edad } = req.body;

        // Asegúrate de usar el nombre correcto del modelo 'mascotas'
        Mascotas.update(
            { nombre, raza, tipo, sexo, edad }, 
            { where: { mascotasId: id } }
        ).then((resultado) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro Actualizado"
            });
        }).catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar Registro ::: ${err}`
            });
        });
    }
};


export{crear, eliminar, buscar, buscarId, actualizar};