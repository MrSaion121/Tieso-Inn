import { AuthUserPayload } from "middlewares/auth";

declare global {
    namespace Express {
        interface User extends AuthUserPayload {}
    }

    namespace Passport {
        interface AuthenticatedRequest extends Express.Request {
            user: AuthUserPayload;
        }
    }
}