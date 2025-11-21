import Database from 'better-sqlite3';

// Ouvre ou crée la base SQLite
const db = new Database('database.db');

// Création de la table "users" si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

export default db;
