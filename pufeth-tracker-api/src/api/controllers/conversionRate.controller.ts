import { Request, Response } from 'express';
import * as conversionRateService from '../services/conversionRate.service';
import { ConversionRate } from "../../types/conversionRate";
import { handleResponse } from "../../util/responseHelper";

export const getRates = async (_req: Request, res: Response): Promise<void> => {
    const rates: ConversionRate[] = await conversionRateService.getConversionRates();
    handleResponse(res, 200, rates);
};