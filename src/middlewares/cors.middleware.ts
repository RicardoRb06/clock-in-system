import cors, { type CorsOptions } from "cors"
import type { RequestHandler } from "express";

export class CorsMiddleware {

    private readonly corsAllowedOrigins: string[];

    constructor(corsAllowedOrigins: string[]){
        this.corsAllowedOrigins = corsAllowedOrigins;
    }

    public handler(): RequestHandler {
        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                if(!origin || this.corsAllowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },

            credentials: true, 
            methods: ["GET", "POST", "PUT", "DELETE"]
        }

        return cors(corsOptions);
    }
}