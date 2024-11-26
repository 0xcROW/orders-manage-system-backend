import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

//TODO remove updated_at
db.run(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)`);

function createUser(newUser){
  newUser.id = uuidv4();
  newUser.timestamp = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES (?,?,?,?,?,?)', 
      [newUser.id, newUser.name, newUser.email, newUser.password, newUser.timestamp, newUser.updated_at], (err) => {
        if(err){
          reject(err);
        }
        //TODO remove everything but the id and message
        resolve({ id: newUser.id, name: newUser.name, email: newUser.email, password: newUser.password, message: 'Usuário criado com sucesso' });
      });
  });
}

function getAllUsers(){
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email FROM users', [], (err, rows) => {
      if(err){
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getUserById(id){
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email FROM users WHERE id = ?', [id], (err, row) => {
      if(err){
        reject(err);
      }
      resolve(row);
    });
  });
}

function getUserByEmail(email){
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, password FROM users WHERE email = ?', [email], (err, row) => {
      if(err){
        reject(err);
      }
      resolve(row);
    });
  });
}

function getUserBySearch(search){
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email FROM users WHERE name LIKE ? OR email LIKE ?', [`%${search}%`, `%${search}%`], (err, rows) => {
      if(err){
        reject(err);
      }
      resolve(rows);
    });
  });
}

function updateUser(id, user){
  return new Promise((resolve, reject) => {
    const { name, email, password } = user;
    const data = ['name', 'email', 'password'];
    let query = 'UPDATE users SET';
    const values = [];

    data.forEach((field) => {
      if(user[field] !== undefined){
        query += ` ${field} = ?,`;
        values.push(user[field]);
      }
    });
    query = query.slice(0, -1);
    query += ' WHERE id = ?';
    values.push(id);

    db.run(query, values, (err) => {
      if(err){
        reject(err);
      }
      resolve({ id, name, email, message: 'Usuário atualizado com sucesso' });
    });
  });
}

function deleteUser(id){
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
      if(err){
        reject(err);
      }
      resolve({ message: 'Usuário deletado com sucesso' });
    });
  });
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserBySearch,
  updateUser,
  deleteUser
};