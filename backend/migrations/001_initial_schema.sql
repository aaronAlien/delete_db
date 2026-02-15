-- users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email_hash TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'confirmed')),
    created_at TEXT NOT NULL,
    confirmed_at TEXT,
    token TEXT UNIQUE NOT NULL
);

-- counters table
CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
);

-- initialise counters
INSERT OR IGNORE INTO counters (metric, count, updated_at) 
VALUES 
    ('signups', 0, datetime('now')),
    ('deletions', 0, datetime('now'));