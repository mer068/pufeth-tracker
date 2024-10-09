CREATE TABLE IF NOT EXISTS conversion_rate (
                                               id SERIAL PRIMARY KEY,
                                               rate NUMERIC NOT NULL,
                                               datetime_utc TIMESTAMPTZ UNIQUE NOT NULL
);

-- TODO: remove seed script
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