import winston, { format, transports } from 'winston';

const logFormat = format.printf(({timestamp, level, message, stack}) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({stack: true}),
        format.splat(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        // Add logging to a file as needed
    ],
});

if (process.env.NODE_ENV === 'production') {
    logger.remove(new transports.Console());
}

export default logger;
