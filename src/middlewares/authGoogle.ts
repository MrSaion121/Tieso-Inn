// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import IUser from '../models/user';
// import userModel from '../models/user';
// import { Application } from 'express';

// // Cargar variables de entorno
// dotenv.config();

// export const googleAuth = (app: Application): void => {
//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID: process.env.GOOGLE_ACCOUNT_ID as string,
//                 clientSecret: process.env.GOOGLE_SECRET_KEY as string,
//                 callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
//             },
//             async(accessToken, refreshToken, profile, cb) => {
//                 try {
//                     let existingUser = await userModel.findOne({ email: profile.emails![0].value });

//                     if (!existingUser) {
//                         const user_id = new mongoose.Types.ObjectId();
//                         existingUser = await userModel.create({
//                             user_id,
//                             name: profile.displayName,
//                             email: profile.emails![0].value,
//                             role: 'Cliente',
//                             password: '',
//                             cellphone: '',
//                             status: 'Activo',
//                         });
//                         await existingUser.save();
//                     }

//                     // Transforma a objeto plano
//                     cb(null, existingUser.toObject());
//                 } catch (error) {
//                     cb(error, undefined); // Cambia `profile` por `undefined`
//                 }
//             }
//         )
//     );

//     passport.serializeUser<typeof IUser>((user, cb) => {
//         // eslint-disable-next-line  @typescript-eslint/no-explicit-any
//         cb(null, user as any);
//     });

//     passport.deserializeUser<typeof IUser>((user, cb) => {
//         // eslint-disable-next-line  @typescript-eslint/no-explicit-any
//         cb(null, user as any);
//     });

//     app.use(
//         session({
//             resave: false,
//             saveUninitialized: true,
//             secret: process.env.SECRET_KEY as string,
//         })
//     );

//     app.use(passport.initialize());
//     app.use(passport.session());
// };
