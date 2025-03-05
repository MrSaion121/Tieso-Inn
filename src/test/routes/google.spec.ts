import request from 'supertest';
//import app from '../../index';
import { HTTP_STATUS_CODES } from '../../types/http-status-codes';
//Cargar variables de entorno
import dotenv from 'dotenv';
//Passport de Google
import passport from 'passport';

dotenv.config();
//Leer el servidor corriendo
const SERVER_URL = process.env.SERVER_URL || '';
const PORT = process.env.PORT || 3000;
//url del servidor
const serverUrl = `${SERVER_URL}:${PORT}`

//Mock De passport para simular autenticacion de Google
jest.mock('passport', () => ({
    authenticate: jest.fn().mockImplementation((strategy: string, options: any) => {
        return (req: any, res: any, next: any) => {
            if (req.query.fail === 'true') {
                // Simular error de Google OAuth: falta de parámetro scope
                return res.status(400).json({
                    error: 'invalid_request',
                    error_description: 'Missing required parameter: scope',
                });
            }
            next();
        };
    }),
}));

//Prueba de Autenticacion Google
describe('Pruebas de autenticacion de Google', () => {

    //Caso prueba para la ruta /auth/google/login
    it('Debe rederigir correctamente a Google para la autenticacion', async () => {
        const response = await request(serverUrl).get('/auth/google/login');    //Hace la solicitud GET al login de Google
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.REDIRECT);    //Se espera que responda con 302 redireccion
        expect(response.header.location).toMatch('https:\/\/accounts\.google\.com\/o\/oauth2\/v2\/auth?'); //Verificar la URL de redireccion de google
    });

    //Caso prueba para la ruta /auth/google/callback
    it('Debe rederigir correctamente despues de la autenticacion de Google', async () => {
        const response = await request(serverUrl).get('/auth/google/callback');    //Hace la solicitud GET a la ruta de callback de Google
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.REDIRECT);    //Se espera que responda con 200 EXITO
        expect(response.text).toBe('') //Verificar que se renderice la pagina raiz
    });

    //Caso en el que la autenticacion falla (mock fail)
    //Pendiente por ver
    /*
    it('Debe rederigir a /login si la autenticacion de Google Falla o no se completa', async () => {
        jest.spyOn(passport, 'authenticate').mockImplementation(() => {
            return (req: any, res: any) => {
            res.redirect('/login'); //Simulando el fail
        }
    });

        const response = await request(serverUrl).get('/auth/google/callback');
        expect(response.statusCode).toBe(HTTP_STATUS_CODES.REDIRECT);       //Se espera que lo redirija
        expect(response.header.location).toBe('/login')                     //Verificar la URL de redireccion de google
    });
    */
});
