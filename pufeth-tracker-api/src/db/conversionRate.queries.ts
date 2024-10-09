export const GET_RECENT_CONVERSION_RATES = `
    SELECT *
    FROM (
             SELECT *
             FROM conversion_rate
             ORDER BY datetime_utc DESC
                 LIMIT 60
         ) AS latest_rates
    ORDER BY datetime_utc ASC;
`;

export const GET_MORE_RECENT_THAN_CONVERSION_RATES = `
    SELECT *
    FROM conversion_rate
    WHERE datetime_utc > $1
    ORDER BY datetime_utc ASC;
`;

export const SAVE_CONVERSION_RATE = `
  INSERT INTO conversion_rate (rate, datetime_utc)
  VALUES ($1, $2);
`;