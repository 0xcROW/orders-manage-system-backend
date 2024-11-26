import db from '../config/database.js';
import shortid from 'shortid';

db.run(`
    CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL, 
        document TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL, 
        phone TEXT, 
        address TEXT, 
        created_at TEXT, 
        updated_at TEXT
    )`
);

function createClient(client) {
  const id = shortid.generate();
  const { name, document, email, phone, address } = client;
  const timestamp = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO clients (id, name, document, email, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, document, email, phone, address, timestamp, timestamp], (err) => {
        if (err) {
          reject(err);
        }
        resolve({ id: id, ...client });
        console.log(id, name, document, email, phone, address, timestamp);
      });
  });
}

function getAllClients() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email, phone, address FROM clients', [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClientByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, phone, address FROM clients WHERE email = ?', [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}

function getClientById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, phone, address FROM clients WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}

function getClientByDocument(document) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, phone, address FROM clients WHERE document = ?', [document], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}

function updateClient(id, client) {
  return new Promise((resolve, reject) => {
    const data = ['name', 'document', 'email', 'phone', 'address'];
    let query = 'UPDATE clients SET ';
    const values = [];

    data.forEach((field) => {
      if (client[field] !== undefined) {
        query += `${field} = ?, `;
        values.push(client[field]);
      }
    });

    query = query.slice(0, -1);
    query += ' id = ?';
    values.push(id);

    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      }
      resolve({ id, ...client, message: 'Cliente atualizado com sucesso!' });
    });
  });
}

function deleteClient(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM clients WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: 'Cliente removido com sucesso!' });
    });
  });
}


export default {
  createClient,
  getAllClients,
  getClientByEmail,
  getClientById,
  getClientByDocument,
  updateClient,
  deleteClient,
};