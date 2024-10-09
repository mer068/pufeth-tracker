export const GET_CONVERSION_RATES = `
    SELECT *
    FROM conversion_rate
    ORDER BY datetime_utc DESC;
`;

export const SAVE_CONVERSION_RATE = `
  INSERT INTO conversion_rate (rate, datetime_utc)
  VALUES ($1, $2);
`;