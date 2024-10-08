import dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';

const app = express();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? [];
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
app.use(cors(corsOptions));

const PORT: string | undefined = process.env.PORT;

app.get('/rates', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM conversion_rate');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

if (PORT) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} else {
    console.error('Error: PORT is not defined in the environment variables');
    process.exit(1);
}
