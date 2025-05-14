//Importar libreria de MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Cargar variables de entorno
dotenv.config();

//Cargar server
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { app } from './app';

let server: HttpServer;
const PORT  = process.env.PORT || 3000;

//Importar la Hash de MongoDB
const dbUrl = process.env.DB_URL;

//Conexion de MongoDB
mongoose.connect(dbUrl as string).then(() => {
    console.log('Conexion exitosa con MongoDB!!..');
    server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('joinRoom', (userData) => {
            socket.join('room-' + userData.room);
            socket.to('room-' + userData.room).emit('joinRoom', userData.user);
        });

        socket.on('sendNewMessage', (data) => {
            //console.log('You got a new message:',data)

            //socket.broadcast.emit('messageReceived', data)
            socket.to('room-' + data.room).emit('messageReceived', data);
        });

        socket.on('leftRoom', (userData) => {
            //console.log('A user has disconnected')
            socket.to('room-' + userData.room).emit('leftRoom', userData.user);
        });
    });
}).catch((err) => {
    console.error('Error al conectar:', err);
});
