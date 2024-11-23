import { Request, Response } from "express";
import User from "../models/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

class UsersController {
  //Obtener todos los usuarios
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find({}, { password: 0 });
      res.status(HTTP_STATUS_CODES.SUCCESS).send(users);
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .json({ message: "Error al conseguir los usuarios" });
    }
  }

  //Obtener usuario By ID
  async getUserById(req: Request, res: Response) {
    try {
      const user_id = req.params["id"];
      const user = await User.findOne({ user_id });
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send("Usuario no encontrado");
      }
      return res.status(HTTP_STATUS_CODES.SUCCESS).json(user);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .json({ message: "Error al conseguir el usuario" });
    }
  }

  //Obtener usuario By ID
  async getRenderUserById(req: Request, res: Response) {
    try {
      const user_id = req.params["id"];
      const user = await User.findOne({ user_id }, { password: 0 });
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send("Usuario no encontrado");
      }
      // Verificar el encabezado Accept para determinar el tipo de respuesta
      const acceptHeader = req.headers.accept || "";
      if (acceptHeader.includes("application/json")) {
        return res.status(HTTP_STATUS_CODES.SUCCESS).json(user);
      } else {
        // Renderizar la vista utilizando Handlebars
        const showTab = user_id === process.env.HOTEL_HELP_ID!;
        return res.status(HTTP_STATUS_CODES.SUCCESS).render("profile", {
          ...user.toObject(),
          showTab,
        });
      }
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .json({ message: "Error al conseguir el usuario" });
    }
  }

  //Crear usuario
  async createUser(req: Request, res: Response) {
    try {
      const { name, role, email, password, cellphone, status } = req.body;

      //Validad passwords
      if (!password) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .json({ message: "La contraseña es requerida." });
      }

      //Validar si usuario existe en DB
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .json({ message: "Este email ya se esta usando" });
      }

      const user_id = new mongoose.Types.ObjectId();
      const hashPassword = await bcrypt.hash(password, 11);

      const newUser = new User({
        user_id,
        name,
        role,
        email,
        password: hashPassword,
        cellphone,
        status,
      });

      await newUser.save();

      //Generar el token
      const token = jwt.sign(
        { email: email, role: newUser.role },
        process.env.SECRET_KEY!,
        {
          expiresIn: "1h",
        }
      );

      //responder con el token y redireccionar al user
      res.status(HTTP_STATUS_CODES.CREATED).json({
        message: "Usuario creado con exito",
        //token: token
      });

      //Caso error:
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .json({ message: "Error al crear el usuario" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user_id = req.params["id"];
      const updatedUser = await User.findOneAndUpdate({ user_id }, req.body, {
        new: true,
      });
      res
        .status(HTTP_STATUS_CODES.SUCCESS)
        .json({ message: "Usuario actualizado ", updatedUser });
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .json("Error al actualizar al usuario");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user_id = req.params["id"];
      const deletedUser = await User.findOneAndDelete({ user_id });
      if (!deletedUser) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("Usuario no encontrado");
      }
      return res
        .status(HTTP_STATUS_CODES.SUCCESS)
        .send("Usuario eliminado con exito");
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error al eliminar al usuario");
    }
  }

  //Login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(`El correo no existe`);
      }

      if (user.status === "Eliminado" || user.status === "Bloqueado") {
        throw new Error(`El usuario esta bloqueado o eliminado`);
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        throw new Error("Contraseña incorrecta");
      }

      //Token
      const token = jwt.sign(
        { email: email, role: user.role },
        process.env.SECRET_KEY!,
        {
          expiresIn: "1h",
        }
      );

      res
        .status(HTTP_STATUS_CODES.SUCCESS)
        .json({ token, user_id: user.user_id, name: user.name });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res
          .status(HTTP_STATUS_CODES.UNATHORIZED)
          .json({ error: error.message });
      } else {
        console.error("Error inesperado", error);
        res
          .status(HTTP_STATUS_CODES.SERVER_ERROR)
          .json({ error: "Error inesperado" });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, cellphone } = req.body;

      //Validad passwords
      if (!password) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("La contraseña es requerida.");
      }

      //Validar si usuario existe en DB
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("Este email ya se esta usando");
      }

      const user_id = new mongoose.Types.ObjectId();
      const hashPassword = await bcrypt.hash(password, 11);

      const newUser = new User({
        user_id,
        name,
        email,
        password: hashPassword,
        cellphone,
      });

      await newUser.save();

      //Generar el token
      const token = jwt.sign(
        { email: email, role: newUser.role },
        process.env.SECRET_KEY!,
        {
          expiresIn: "1h",
        }
      );

      //responder con el token y redireccionar al user
      res.status(HTTP_STATUS_CODES.CREATED).json({
        message: "Usuario Registrado con exito",
        //token: token
      });

      //Caso error:
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error al crear el usuario");
    }
  }
}

export default new UsersController();
