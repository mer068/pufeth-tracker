import { Response } from 'express';

export const handleResponse = (
    res: Response,
    statusCode: number,
    data: any = null
): void => {
    if (data instanceof Error) {
        res.status(statusCode).json({
            message: data.message,
            error: data.stack
        });
    } else {
        res.status(statusCode).json(data);
    }
};
