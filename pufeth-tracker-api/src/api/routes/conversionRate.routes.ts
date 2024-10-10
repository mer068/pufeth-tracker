import { Router } from 'express';
import { getRates, getRecentRates } from "../controllers/conversionRate.controller";

const conversionRateRouter = Router();

conversionRateRouter.get('/', getRates);
conversionRateRouter.get('/latest', getRecentRates);

export default conversionRateRouter;
