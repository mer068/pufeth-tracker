import vars from "./vars";
import cors from "cors";

const allowedOrigins = vars.corsAllowedOrigins?.split(',') ?? [];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

export default corsOptions;