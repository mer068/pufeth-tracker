export const GET_CONVERSION_RATES = `
    SELECT *
    FROM conversion_rate_average
    WHERE datetime_utc BETWEEN $1 and $2
    ORDER BY datetime_utc ASC;
`;