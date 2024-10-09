import { Router } from 'express';
import conversionRateRoutes from "./routes/conversionRate.routes";

const router = Router();

router.use('/rates', conversionRateRoutes);

export default router;