import { Router } from "express";
import path from "path";
import UserController from "../controller/users.controller";

const router = Router();

//Ruta register | GET
router.get('/', (req, res) => {
    res.render('register')
});

//Ruta register | POST
router.post('/', UserController.register);

export default router;