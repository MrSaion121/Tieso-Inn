import { AuthUserPayload } from '../middlewares/auth';

declare module 'express-serve-static-core' {
    // eslint-disable-next-line  @typescript-eslint/no-empty-object-type
    interface User extends AuthUserPayload {}
}

declare module 'passport' {
    interface AuthenticatedRequest extends Express.Request {
        user: AuthUserPayload;
    }
}
