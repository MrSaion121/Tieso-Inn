import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';
import IUser from '../models/user';
import userModel from '../models/user';
import mongoose from 'mongoose';

// Cargar variables de entorno
dotenv.config();

export const googleAuth = (app: any) => {
    //Configuracion de la estrategia google
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ACCOUNT_ID as string,
                clientSecret: process.env.GOOGLE_SECRET_KEY as string,
                callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            },
            async (accessToken, refreshToken, profile, cb) => {
                //Proceso para guardar el usuario en BDD o verificarlo
                try {

                    let existingUser = await userModel.findOne({ email: profile.emails![0].value });
                    if (!existingUser) {
                        //Existe o no el usuario
                        const user_id = new mongoose.Types.ObjectId()
                        existingUser = await userModel.create({
                            user_id,
                            name:profile.displayName,
                            email: profile.emails![0].value,
                            role: 'Cliente',
                            password: '',
                            cellphone: '',
                            status: 'Activo',
                        });
                        await existingUser.save();
                    }
                    return cb(null, existingUser);
                } catch (error) {
                    return cb(error, profile);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user: typeof IUser, cb) => {
        cb(null, user);
    });

    app.use(
        session({
            resave: false,
            saveUninitialized: true,
            secret: process.env.SECRET_KEY as string,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
};
