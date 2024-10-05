import express from 'express';
//Importar libreria de MongoDB
import { connect } from 'mongoose';
import dotenv from 'dotenv';

//Cargar variables de entorno
dotenv.config();

//importar rutas
import router from './routes';

const app = express();
const PORT  = process.env.PORT || 3000;

//Importar la Hash de MongoDB
const dbUrl = process.env.DB_URL;
//console.log('Mongo URL:', dbUrl);

app.use(router);

//Conexion de MongoDB
connect(dbUrl as string).then( res => {
    console.log('Ya se conecto');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(err => {
    console.log('Error al conectar:', err);
});