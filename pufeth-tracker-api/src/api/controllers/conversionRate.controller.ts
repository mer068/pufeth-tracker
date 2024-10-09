import { Request, Response } from 'express';
import * as conversionRateService from '../services/conversionRate.service';
import { ConversionRate } from "../../types/conversionRate";
import { handleResponse } from "../../util/responseHelper";

export const getRecentRates = async (req: Request, res: Response): Promise<void> => {
    const rates: ConversionRate[] = await conversionRateService.getRecentConversionRates(req.query.from as string | undefined);
    handleResponse(res, 200, rates);
};