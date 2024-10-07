import express from "express";
import { routerMascota } from "./rutas/mascotasRouter.js";
import { routerInteresados } from "./rutas/interesadosRouter.js";
import { routerSolicitud } from "./rutas/solicitudRouter.js";
import {db} from "./database/conexion.js";
import "./modelos/centralizar.js"; // Importar modelos y asociaciones

// Crear instancias de Express
const app = express();

//Middleware JSON
app.use(express.json());

//Verificar conexión base de datos
db.authenticate().then(()=> {
    console.log(`Conexión a base de datos Correcta`);
}).catch(err =>{
    console.log(`Conexión a base de datos Incorrecta ${err}`);
});

//Definir rutas
app.get('/', (req, res) =>{
    res.send('Hola sitio Principal');
});

//Llamar rutas
app.use("/mascotas", routerMascota);
app.use("/interesados", routerInteresados);
app.use("/solicitudes", routerSolicitud);


//Puerto de servidor
const PORT = 4000;

db.sync().then(()=>{
    //Abrir servicio e iniciar el servicio
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    });
}).catch(err =>{
    console.log(`Error al sincronizar base de datos ${err}`);
});
