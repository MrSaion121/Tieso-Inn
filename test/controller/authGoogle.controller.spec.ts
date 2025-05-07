// import { googleCallback } from '../../src/controller/authGoogle.controller';
// import jwt from 'jsonwebtoken';
// import { Request, Response } from 'express';

// jest.mock('jsonwebtoken');
// const mockedJwt = jwt as jest.Mocked<typeof jwt>;

// describe('googleCallback', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let redirectMock: jest.Mock;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     redirectMock = jest.fn();
//     res = { redirect: redirectMock };
//     process.env.SECRET_KEY = 'test_secret';
//   });

//   it('should redirect to "/" if no user is present', () => {
//     req = { user: undefined };
//     googleCallback(req as Request, res as Response);
//     expect(redirectMock).toHaveBeenCalledWith('/');
//   });

//   it('should generate a JWT token and redirect with token and user data', () => {
//     const mockToken = 'mocked.jwt.token';
//     const mockedSign = jwt.sign as jest.Mock;
//     mockedSign.mockReturnValue(mockToken);
//     req = {
//       user: {
//         email: 'user@example.com',
//         role: 'admin',
//         name: 'Test User',
//         user_id: '12345'
//       }
//     };
//     googleCallback(req as Request, res as Response);
//     expect(mockedJwt.sign).toHaveBeenCalledWith(
//       { email: 'user@example.com', role: 'admin' },
//       'test_secret',
//       { expiresIn: '1h' }
//     );
//     expect(redirectMock).toHaveBeenCalledWith(
//       `/?token=${mockToken}&name=Test%20User&user_id=12345`
//     );
//   });
// });
