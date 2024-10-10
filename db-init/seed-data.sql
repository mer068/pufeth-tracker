DO $$
DECLARE
v_rate NUMERIC;
    v_datetime_utc TIMESTAMPTZ := NOW() - INTERVAL '3 days';  -- Start 3 days ago
    v_end_time TIMESTAMPTZ := NOW();  -- End at the current time
    v_cluster_shift NUMERIC := 0;  -- Used to create clusters of similar values
    v_insert TEXT := 'INSERT INTO conversion_rate (datetime_utc, rate) VALUES ';
BEGIN
    -- Loop to generate rows for every 30-second interval over the past 3 days
    WHILE v_datetime_utc < v_end_time LOOP
        -- Randomly cluster values by changing the base of rate within range in clusters
        IF random() < 0.05 THEN
            -- Occasionally shift clusters
            v_cluster_shift := 0.9 + random() * 0.122;  -- Randomly shift clusters in range 0.9 - 1.022
END IF;

        -- Generate random rate within a smaller range based on the cluster
        v_rate := v_cluster_shift + (random() * 0.001);

        -- Append the generated row to the insert statement
        v_insert := v_insert || format('(%L, %L)', v_datetime_utc, v_rate);

        -- Add a comma if not the last row
        IF v_datetime_utc + INTERVAL '30 seconds' < v_end_time THEN
            v_insert := v_insert || ', ';
ELSE
            v_insert := v_insert || ';';  -- End the statement
END IF;

        -- Increment datetime by 30 seconds
        v_datetime_utc := v_datetime_utc + INTERVAL '30 seconds';
END LOOP;

    -- Execute the generated insert statement
EXECUTE v_insert;
END $$;
