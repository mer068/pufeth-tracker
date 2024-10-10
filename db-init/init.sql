CREATE TABLE IF NOT EXISTS conversion_rate (
                                               id SERIAL PRIMARY KEY,
                                               rate NUMERIC NOT NULL,
                                               datetime_utc TIMESTAMPTZ UNIQUE NOT NULL
);

-- Create derived table storing hourly averages for easier querying
CREATE TABLE conversion_rate_average (
                                        id SERIAL PRIMARY KEY,
                                        datetime_utc TIMESTAMPTZ NOT NULL,
                                        rate NUMERIC NOT NULL
);

-- Manages derived table
CREATE OR REPLACE FUNCTION update_conversion_rate_average()
RETURNS TRIGGER AS $$
DECLARE
v_rate NUMERIC;
    v_hour_start TIMESTAMPTZ;
BEGIN
    -- Calculate the start of the current hour
    v_hour_start := date_trunc('hour', NEW.datetime_utc);

    -- Calculate the average rate for the current hour (you can modify this query as needed)
SELECT AVG(rate)
INTO v_rate
FROM conversion_rate
WHERE date_trunc('hour', datetime_utc) = v_hour_start;

-- Insert the rate average into the hourly table
INSERT INTO conversion_rate_average (hour_start, rate)
VALUES (v_hour_start, v_rate);

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_conversion_rate_average
    AFTER INSERT ON conversion_rate
    FOR EACH ROW
    EXECUTE FUNCTION update_conversion_rate_average();

-- TODO: remove seed scripts

-- Seeds conversion_rate table
DO $$
DECLARE
v_rate NUMERIC;
    v_datetime_utc TIMESTAMPTZ;
    v_start_time TIMESTAMPTZ := NOW() - INTERVAL '30 minutes';  -- 30 minutes ago (for example)
    v_end_time TIMESTAMPTZ := NOW();  -- current time
    v_sql TEXT := 'INSERT INTO conversion_rate (rate, datetime_utc) VALUES ';
BEGIN
    -- Loop to generate 60 rows
FOR i IN 1..60 LOOP
        -- Generate random rate between 1.021822595426378 and 1.022822595426378
        v_rate := 1.021822595426378 + (random() * (1.022822595426378 - 1.021822595426378));

        -- Calculate the datetime_utc value (increment 30 seconds per row)
        v_datetime_utc := v_start_time + (i * INTERVAL '30 seconds');

        -- Build the SQL statement
        v_sql := v_sql || format('(%L, %L)', v_rate, v_datetime_utc);

        -- Add a comma if not the last row
        IF i < 60 THEN
            v_sql := v_sql || ', ';
END IF;
END LOOP;

    -- Execute the generated SQL
EXECUTE v_sql;
END $$;

-- Seeds conversion_rate_average table
DO $$
DECLARE
v_rate NUMERIC;
    v_hour_start TIMESTAMPTZ;
    v_current_time TIMESTAMPTZ := NOW();  -- Current time
    v_start_time TIMESTAMPTZ := NOW() - INTERVAL '2 days';  -- Start time (2 days ago)
BEGIN
    -- Loop through each hour from 2 days ago to now using GENERATE_SERIES
FOR v_hour_start IN
SELECT * FROM GENERATE_SERIES(v_start_time, v_current_time, '1 hour'::INTERVAL) AS hour_series LOOP

        -- Generate a random rate between 1.021822595426378 and 1.022822595426378
        v_rate := 1.021822595426378 + (random() * (1.022822595426378 - 1.021822595426378));

-- Insert the record into the conversion_rate_average table
INSERT INTO conversion_rate_average (datetime_utc, rate)
VALUES (v_hour_start, v_rate);

END LOOP;
END $$;
