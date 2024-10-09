export const GET_CONVERSION_RATES = `
    SELECT *
    FROM conversion_rate
    ORDER BY datetime_utc DESC;
`;