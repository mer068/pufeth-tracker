CREATE TABLE IF NOT EXISTS conversion_rate (
                                               id SERIAL PRIMARY KEY,
                                               rate NUMERIC NOT NULL,
                                               datetime_utc TIMESTAMP UNIQUE NOT NULL
);
