import { AuthJwtPayload } from "../middlewares/auth.middleware";

declare global {
    namespace Express {
        interface Request {
            user?: AuthJwtPayload;
        }
    }
}