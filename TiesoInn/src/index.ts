import express from 'express';
//Importar libreria de MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

//Cargar variables de entorno
dotenv.config();

//importar rutas
import router from './routes'
const app = express();
const PORT  = process.env.PORT || 3000;

//Importar la Hash de MongoDB
const dbUrl = process.env.DB_URL;
//console.log('Mongo URL:', dbUrl);

//Path para estilos. (CSS/JS)
app.use('/', express.static(path.join(__dirname, '..', 'public')))

// Middleware para manejar JSON
app.use(express.json());

// Middleware para manejar datos del formulario (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

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