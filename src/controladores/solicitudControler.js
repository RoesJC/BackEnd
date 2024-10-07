// controllers/solicitudController.js
import { Solicitudes, Interesados, Mascotas } from "../modelos/centralizar.js";

// Crear una solicitud
const crear = async (req, res) => {
    try {
        const { interesId, mascotasId, estado, fecha } = req.body;

        // Validar que se reciban los IDs necesarios
        if (!interesId || !mascotasId) {
            return res.status(400).json({ 
                mensaje: "Faltan datos de interesado o mascota." 
            });
        }

        // Verificar si el interesado existe
        const interesado = await Interesados.findByPk(interesId);
        if (!interesado) {
            return res.status(404).json({ 
                mensaje: `No se encontró interesado con id ${interesId}.` 
            });
        }

        // Verificar si la mascota existe
        const mascota = await Mascotas.findByPk(mascotasId);
        if (!mascota) {
            return res.status(404).json({ 
                mensaje: `No se encontró mascota con id ${mascotasId}.` 
            });
        }

        // Crear la solicitud
        const solicitud = await Solicitudes.create({
            interesId,
            mascotasId,
            estado: estado || 'pendiente',
            fecha: fecha || new Date()
        });

        return res.status(201).json({
            mensaje: "Registro de solicitud creado con éxito",
            solicitud
        });

    } catch (err) {
        console.error("Error al crear solicitud:", err);
        return res.status(500).json({
            mensaje: `Registro de solicitud no creado ::: ${err.message}`
        });
    }
}

// Eliminar una solicitud
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                mensaje: "El id no puede estar vacío"
            });
        }

        const resultado = await Solicitudes.destroy({
            where: { solicitudId: id }
        });

        if (resultado) {
            return res.status(200).json({
                mensaje: `Solicitud con id ${id} eliminada exitosamente.`
            });
        } else {
            return res.status(404).json({
                mensaje: `No se encontró una solicitud con id ${id}.`
            });
        }
    } catch (err) {
        console.error("Error al eliminar solicitud:", err);
        return res.status(500).json({
            mensaje: `Error al eliminar el registro: ${err.message}`
        });
    }
}

// Buscar todas las solicitudes
const buscar = async (req, res) => {
    try {
        const solicitudes = await Solicitudes.findAll({
            include: [
                { 
                    model: Interesados, 
                    as: 'interesado' 
                },
                { 
                    model: Mascotas, 
                    as: 'mascota' 
                }
            ]
        });
        return res.status(200).json(solicitudes);
    } catch (err) {
        console.error("Error al buscar solicitudes:", err);
        return res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err.message}`
        });
    }
}

// Buscar una solicitud por ID
const buscarId = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                mensaje: "El id no puede estar vacío"
            });
        }

        const solicitud = await Solicitudes.findByPk(id, {
            include: [
                { 
                    model: Interesados, 
                    as: 'interesado' 
                },
                { 
                    model: Mascotas, 
                    as: 'mascota' 
                }
            ]
        });

        if(solicitud){
            return res.status(200).json(solicitud);
        } else {
            return res.status(404).json({
                mensaje: `No se encontró una solicitud con id ${id}.`
            });
        }
    } catch (err) {
        console.error("Error al buscar solicitud por id:", err);
        return res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err.message}`
        });
    }
}

// Actualizar una solicitud
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                mensaje: "El id no puede estar vacío"
            });
        }

        const { estado, fecha, interesId, mascotasId } = req.body;

        const dataset = {};
        if(estado !== undefined) dataset.estado = estado;
        if(fecha !== undefined) dataset.fecha = fecha;
        if(interesId !== undefined) {
            // Verificar si el interesado existe
            const interesado = await Interesados.findByPk(interesId);
            if (!interesado) {
                return res.status(404).json({ 
                    mensaje: `No se encontró interesado con id ${interesId}.` 
                });
            }
            dataset.interesId = interesId;
        }
        if(mascotasId !== undefined) {
            // Verificar si la mascota existe
            const mascota = await Mascotas.findByPk(mascotasId);
            if (!mascota) {
                return res.status(404).json({ 
                    mensaje: `No se encontró mascota con id ${mascotasId}.` 
                });
            }
            dataset.mascotasId = mascotasId;
        }

        if(Object.keys(dataset).length === 0){
            return res.status(400).json({
                mensaje: "No se encontraron datos para actualizar"
            });
        }

        const [updatedRows] = await Solicitudes.update(dataset, { 
            where: { solicitudId: id } 
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                mensaje: `No se encontró una solicitud con id ${id} para actualizar.`
            });
        } else {
            return res.status(200).json({
                mensaje: "Registro actualizado correctamente."
            });
        }
    } catch (err) {
        console.error("Error al actualizar solicitud:", err);
        return res.status(500).json({
            mensaje: `Error al actualizar el registro ::: ${err.message}`
        });
    }
}

export { crear, eliminar, buscar, buscarId, actualizar };

