CREATE TABLE IF NOT EXISTS conversion_rate (
                                               id SERIAL PRIMARY KEY,
                                               rate NUMERIC NOT NULL,
                                               datetime_utc TIMESTAMPTZ UNIQUE NOT NULL
);

-- Create derived table storing hourly averages for easier querying
CREATE TABLE conversion_rate_average (
                                        id SERIAL PRIMARY KEY,
                                        datetime_utc TIMESTAMPTZ UNIQUE NOT NULL,
                                        rate NUMERIC NOT NULL
);

-- Manages derived table
CREATE OR REPLACE FUNCTION update_conversion_rate_average()
    RETURNS TRIGGER AS $$
DECLARE
v_rate NUMERIC;
    v_datetime_utc TIMESTAMPTZ;
BEGIN
    -- Calculate the start of the current hour
    v_datetime_utc := date_trunc('hour', NEW.datetime_utc);

    -- Calculate the average rate for the current hour (you can modify this query as needed)
SELECT AVG(rate)
INTO v_rate
FROM conversion_rate
WHERE date_trunc('hour', datetime_utc) = v_datetime_utc;

-- Upsert into the conversion_rate_average table:
-- If a row with the same datetime_utc exists, update it, otherwise insert a new row
INSERT INTO conversion_rate_average (datetime_utc, rate)
VALUES (v_datetime_utc, v_rate)
    ON CONFLICT (datetime_utc)
    DO UPDATE
    SET rate = EXCLUDED.rate;  -- Update the existing row with the new rate

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_conversion_rate_average
    AFTER INSERT ON conversion_rate
    FOR EACH ROW
    EXECUTE FUNCTION update_conversion_rate_average();
