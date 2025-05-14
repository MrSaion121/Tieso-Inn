import express from 'express';
import path from 'path';

// Handlebars
import { engine } from 'express-handlebars';

import dotenv from 'dotenv';
//importar rutas
import router from './routes';
//importacion google
//import { googleAuth } from './middlewares/authGoogle';

//Importar swagger
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './swagger.config.json';

//Cargar variables de entorno
dotenv.config();

const app = express();

//Path para estilos. (CSS/JS)
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// Middleware para manejar JSON
app.use(express.json());

// Middleware para manejar datos del formulario (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Configurar autenticación con Google
//googleAuth(app);

//Configuracion de rutas
app.use(router);

// Configuración del motor de plantillas
type HandlebarsHelpers = {
    eq: (a: string | number, b: string | number) => boolean;
    or: (...args: unknown[]) => boolean;
}

const helpers: HandlebarsHelpers = {
    eq: (a, b) => a === b,
    or: (...args) => args.slice(0, -1).some(Boolean),
};

app.engine('handlebars', engine({helpers}));
app.set('view engine', 'handlebars');

//Conexion a Swagger
const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

export { app };
