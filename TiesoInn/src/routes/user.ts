import { Router } from "express"
import usersController from "../controller/users.controller";
//Importacion middleware Token
import { authenticateToken } from "../middlewares/auth";
//Importacion middleware Role
import { authorizaRole } from "../middlewares/permissions";

const router = Router();

//Ruta para Obtener todos los usuarios | Permisos [Admin, Gerente]
router.get('/', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.getAllUsers);

//Ruta para Obtener un usuario por el email | Permisos [ everyone ]
router.get('/:email', authenticateToken, usersController.getUserByEmail);

//Ruta para crear un nuevo usuario | Permisos [Admin]
router.post('/', authenticateToken, authorizaRole(['Admin']), usersController.createUser);

//Ruta para actualizar info del usuario | Permisos [Admin, Gerente]
router.put('/:email', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.updateUser);

//Ruta para eliminar un usuario | Permisos [Admin]
router.delete('/:email', authenticateToken, authorizaRole(['Admin']), usersController.deleteUser);

export default router;