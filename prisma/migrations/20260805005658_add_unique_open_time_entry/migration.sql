CREATE UNIQUE INDEX unique_open_time_entry
ON "time_entries" ("user_id")
WHERE "clock_out" IS NULL;