import { Request, Response } from "express";
import Room from "../models/room";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import Category from "../models/category";
import mongoose from "mongoose";

class RoomsController {
  async getAll(req: Request, res: Response) {
    try {
      const rooms = await Room.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "category_id",
            as: "category"
          }
        },
        { 
          $unwind: "$category"
        }
      ]);      
      console.log(rooms)
      const acceptHeader = req.headers.accept || "";
      if (acceptHeader.includes("application/json")) {
        res.json(rooms);
      } else {
        const plainRooms = rooms.map((room, index) => ({
          ...room,
          roomNumber: 101 + index,
        }));
        res.render("rooms", { rooms: plainRooms });
      }
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error al conseguir las habitaciones");
    }
  }

  async getRoomByID(req: Request, res: Response) {
    try {
      const room_id = req.params["room_id"];
      const room = await Room.aggregate([
        {
          $match: { room_id: new mongoose.Types.ObjectId(room_id) }
        },
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "category_id",
            as: "category"
          }
        },
        { 
          $unwind: "$category"
        }
      ]);
  
      if (!room) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send("Habitación no encontrada");
      }
  
      // Verificar el encabezado Accept para determinar el tipo de respuesta
      const acceptHeader = req.headers.accept || "";
      if (acceptHeader.includes("application/json")) {
        return res.json(room);
      } else {
        // Renderizar la vista utilizando Handlebars
        console.log(room)
        return res.render("room",  room );
      }
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error obteniendo la habitación");
    }
  }
  

  async createRoom(req: Request, res: Response) {
    try {
      const {
        room_id,
        category_id,
        price_per_night,
        name,
        description,
        image_url,
        status,
      } = req.body;
      const roomExists = await Room.findOne({ room_id });
      const categoryExists = await Category.findOne({ category_id });

      if (roomExists) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("Esta habitación ya existe");
      }
      if (!categoryExists) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("Categoría " + category_id + " no encontrada");
      }

      const newRoom = new Room({
        name,
        room_id,
        category_id,
        price_per_night,
        description,
        image_url,
        status,
      });

      await newRoom.save();
      res.status(HTTP_STATUS_CODES.CREATED).send(newRoom);
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error creando la habitación");
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const room_id = req.params["room_id"];
      const updatedRoom = await Room.findOneAndUpdate({ room_id }, req.body, {
        new: true,
      });
      res
        .status(HTTP_STATUS_CODES.SUCCESS)
        .send("Habitación " + updatedRoom + " actualizada correctamente");
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error actualizando la habitación");
    }
  }

  async deteleRoom(req: Request, res: Response) {
    try {
      const room_id = req.params["room_id"];
      const deletedRoom = await Room.findOneAndDelete({ room_id });
      if (!deletedRoom) {
        return res
          .status(HTTP_STATUS_CODES.BAD_REQUEST)
          .send("Habitación no encontrada");
      }
      return res
        .status(HTTP_STATUS_CODES.SUCCESS)
        .send("Habitación eliminada correctamente");
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS_CODES.SERVER_ERROR)
        .send("Error eliminando la habitación");
    }
  }
}

const roomsController = new RoomsController();
export default roomsController;
