import vars from "./config/vars";
import app from "./config/express";
import logger from "./middleware/logger";

const HOST: string | undefined = vars.host;
const PORT: string | undefined = vars.port;

if (PORT) {
    app.listen(PORT, () => {
        logger.info(`Server is running on http://${HOST}:${PORT}`);
    });
} else {
    logger.error('Server could not start');
    process.exit(1);
}
