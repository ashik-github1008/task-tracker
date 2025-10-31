const Database = require('better-sqlite3');
const path = require('path');

// Database file
const dbPath = path.resolve(__dirname, '../../task_tracker.db');
const db = new Database(dbPath);

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) DEFAULT 'Open',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;
