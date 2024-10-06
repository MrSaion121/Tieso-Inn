import { Request, Response } from "express";
import { IReservation } from '../models/reservation';
import { IUser } from '../models/user';


//AutoIncrement "reservation_num"
let reservationCounter = 1
