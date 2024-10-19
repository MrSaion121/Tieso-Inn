import { Router } from "express"
import usersController from "../controller/users.controller";

const router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:email', usersController.getUserByEmail);
router.post('/', usersController.createUser);
router.put('/:email', usersController.updateUser);
router.delete('/:email', usersController.deleteUser);
router.post('/login', usersController.login);

export default router;