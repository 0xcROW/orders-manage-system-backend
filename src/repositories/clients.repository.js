import db from '../config/database.js'; 
import { nanoid } from 'nanoid';  // Use nanoid for ID generation

db.run(`
  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY, 
    name TEXT NOT NULL, 
    document TEXT UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    phone TEXT, 
    address TEXT, 
    created_at TEXT, 
    updated_at TEXT, 
    userId TEXT NOT NULL, 
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`);

function createClient(client, userId) {
  return new Promise((resolve, reject) => {
    const id = nanoid();  // Using nanoid instead of shortid
    const { name, document, email, phone, address } = client;
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO clients (id, name, document, email, phone, address, created_at, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [id, name, document, email, phone, address, timestamp, userId], function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: id, message: 'Cliente criado com sucesso!' });
      });
  });
}

function getAllClients() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email, phone, address, userId FROM clients', [], (err, rows) => {
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
    db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => {
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
    const timestamp = new Date().toISOString();

    data.forEach((field) => {
      if (client[field] !== undefined) {
        query += `${field} = ?, `;
        values.push(client[field]);
      }
    });

    query = query.slice(0, -2);  // Remove last comma
    query += ', updated_at = ? WHERE id = ?';
    values.push(timestamp, id);  // Add the timestamp and id for WHERE clause

    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: 'Cliente atualizado com sucesso!' });
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

async function searchClients(searchCriteria) {
  try {
    // Build the SQL query dynamically based on the search criteria
    let query = 'SELECT id, name, email, phone, address FROM clients WHERE 1=1';
    const params = [];

    if (searchCriteria.name) {
      query += ' AND name LIKE ?';
      params.push(`%${searchCriteria.name}%`);
    }

    if (searchCriteria.email) {
      query += ' AND email LIKE ?';
      params.push(`%${searchCriteria.email}%`);
    }

    if (searchCriteria.document) {
      query += ' AND document LIKE ?';
      params.push(`%${searchCriteria.document}%`);
    }

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  } catch (error) {
    throw new Error('Error while searching for clients');
  }
}

export default {
  createClient, 
  getAllClients, 
  getClientByEmail, 
  getClientById, 
  getClientByDocument, 
  updateClient, 
  deleteClient,
  searchClients,
};
