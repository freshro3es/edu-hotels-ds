import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('users.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        age INTEGER NOT NULL
    )`);
});

export default db;
