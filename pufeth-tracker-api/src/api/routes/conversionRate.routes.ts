import { Router } from 'express';
import { getRecentRates } from "../controllers/conversionRate.controller";

const conversionRateRouter = Router();

conversionRateRouter.get('/latest', getRecentRates);

export default conversionRateRouter;
