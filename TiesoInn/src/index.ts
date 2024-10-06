import express from 'express';
//Importar libreria de MongoDB
import mongoose from 'mongoose';
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

app.use(express.json());
app.use(router);

//Conexion de MongoDB
mongoose.connect(dbUrl as string)
.then( res => {
    console.log('Conexion exitosa con MongoDB!!..');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(err => {
    console.log('Error al conectar:', err);
});