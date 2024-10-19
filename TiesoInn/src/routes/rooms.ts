import { Router } from 'express';
import roomsController from '../controller/rooms.controller';

//Importacion middlewares
import { authenticateToken } from '../middlewares/auth';
import { authorizaRole } from '../middlewares/permissions';

const router = Router();

//Obtener todas las habitaciones | Permisos [Todos]
router.get('', authenticateToken, roomsController.getAll);

//Obtener la habitacion por el ID | Permisos [Todos]
router.get('/:room_id',  authenticateToken, roomsController.getRoomByID);

//Crear una habitacion | Permisos [Gerente]
router.post('',  authenticateToken, authorizaRole(['Gerente']), roomsController.createRoom);

//Actualizar una habitacion | Permisos [Gerente]
router.put('/:room_id',  authenticateToken, authorizaRole(['Gerente']), roomsController.updateRoom);

//Eliminar una habitacion | Permisos [Gerente]
router.delete('/:room_id',  authenticateToken, authorizaRole(['Gerente']), roomsController.deteleRoom);

export default router;