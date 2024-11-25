import db from '../config/database.js';

db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, user_id INTEGER, total REAL, created_at TEXT, updated_at TEXT)');