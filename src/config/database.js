import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('temp_db.sqlite3', (err) => {;
  if(err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

export default db;