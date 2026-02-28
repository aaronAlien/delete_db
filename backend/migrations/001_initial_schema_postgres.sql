-- users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email_hash TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'confirmed')),
    created_at TIMESTAMP NOT NULL,
    confirmed_at TIMESTAMP,
    expires_at TIMESTAMP,
    token TEXT UNIQUE NOT NULL
);

-- counters table
CREATE TABLE IF NOT EXISTS counters (
    id SERIAL PRIMARY KEY,
    metric TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL
);

-- initialize counters
INSERT INTO counters (metric, count, updated_at) 
VALUES ('completed_cycles', 0, NOW())
ON CONFLICT (metric) DO NOTHING;