import { Router } from 'express';
import roomsController from '../controller/rooms.controller';

const router = Router();

router.get('', roomsController.getAll);
router.get('/:room_id', roomsController.getRoomByID);
router.post('', roomsController.createRoom);
router.put('/:room_id', roomsController.updateRoom);
router.delete('/:room_id', roomsController.deteleRoom);

export default router;