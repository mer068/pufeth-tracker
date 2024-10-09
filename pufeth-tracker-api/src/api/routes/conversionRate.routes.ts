import { Router } from 'express';
import { getRates } from "../controllers/conversionRate.controller";

const conversionRateRouter = Router();

conversionRateRouter.get('/', getRates);

export default conversionRateRouter;
