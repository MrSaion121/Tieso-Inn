import { Router } from "express";
import path from "path";
import UserController from "../controller/users.controller";

const router = Router();

//Ruta register | GET
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'))
});

//Ruta register | POST
router.post('/', UserController.createUser);

export default router;