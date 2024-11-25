import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

db.run(`
    CREATE TABLE IF NOT EXISTS clients (
        id UUID PRIMARY KEY, 
        name TEXT, 
        document TEXT,
        email TEXT, 
        phone TEXT, 
        address TEXT, 
        created_at TEXT, 
        updated_at TEXT
    )`);

function createClient(client) {
  const id = uuidv4();
  const { name, document, email, phone, address } = client;
  const timestamp = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO clients (id, name, document, email, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, document, email, phone, address, timestamp, timestamp], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ id: id, ...client });
      });
  });
}

export default { createClient };