import express from 'express';
import path from 'path';

// Handlebars
import { engine } from 'express-handlebars';

//Importar libreria de MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

//Cargar server
import { Server } from 'socket.io'

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

// Configuración del motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//Conexion a Swagger
const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

//Conexion de MongoDB
mongoose.connect(dbUrl as string)
.then( res => {
    console.log('Conexion exitosa con MongoDB!!..');
    const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

    const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('joinRoom', (userData) => {
        socket.join('room-' + userData.room)
        socket.to('room-' + userData.room).emit('joinRoom', userData.user)
    })

    socket.on('sendNewMessage', (data) => {
        //console.log('You got a new message:',data)

        //socket.broadcast.emit('messageReceived', data)
        socket.to('room-' + data.room).emit('messageReceived', data)
    })

    socket.on('leftRoom', (userData) => {
        //console.log('A user has disconnected')
        socket.to('room-' + userData.room).emit('leftRoom', userData.user)
    })
    
});
}).catch(err => {
    console.log('Error al conectar:', err);
});