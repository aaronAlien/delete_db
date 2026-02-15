import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || './database.sqlite';
const db = new Database(dbPath);

// enable foreign keys
db.pragma('foreign_keys = ON');

// run migrations
const migrationPath = path.join(__dirname, '../../migrations/001_initial_schema.sql');
const migration = fs.readFileSync(migrationPath, 'utf-8');
db.exec(migration);

console.log('✓ database initialised');

export default db;