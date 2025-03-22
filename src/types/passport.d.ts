import { AuthUserPayload } from '../middlewares/auth';

// eslint-disable-next-line  @typescript-eslint/no-empty-object-type
declare module 'express-serve-static-core' {
    interface User extends AuthUserPayload {}
}

declare module 'passport' {
    interface AuthenticatedRequest extends Express.Request {
        user: AuthUserPayload;
    }
}
