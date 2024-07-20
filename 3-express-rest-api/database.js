import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();
sqlite3.verbose();

const dbFilePath = process.env.DB_FILE || 'default.db';
const db = new sqlite3.Database(dbFilePath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        age INTEGER NOT NULL
    )`);
});

export default db;
