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
router.get('/:id', authenticateToken, usersController.getUserById);

//Ruta para crear un nuevo usuario | Permisos [Admin]
router.post('/', authenticateToken, authorizaRole(['Admin']), usersController.createUser);

//Ruta para actualizar info del usuario | Permisos [Admin, Gerente]
router.put('/:id', authenticateToken, authorizaRole(['Admin', 'Gerente']), usersController.updateUser);

//Ruta para eliminar un usuario | Permisos [Admin]
router.delete('/:id', authenticateToken, authorizaRole(['Admin']), usersController.deleteUser);

//Ruta para el inicio de sesion | Permisos [ everyone ]
router.post('/login', usersController.login);

export default router;