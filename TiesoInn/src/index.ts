import express from 'express';

//Importar libreria de MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
//importar rutas
import router from './routes'
//importacion google
import { googleAuth } from './middlewares/authGoogle';

//Importar swagger
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './../swagger.config.json';

//Cargar variables de entorno
dotenv.config();

const app = express();
const PORT  = process.env.PORT || 3000;

//Importar la Hash de MongoDB
const dbUrl = process.env.DB_URL;

//Path para estilos. (CSS/JS)
app.use('/', express.static(path.join(__dirname, '..', 'public')))

// Middleware para manejar JSON
app.use(express.json());

// Middleware para manejar datos del formulario (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Configurar autenticación con Google
googleAuth(app);

//Configuracion de rutas
app.use(router);

//Conexion a Swagger

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

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