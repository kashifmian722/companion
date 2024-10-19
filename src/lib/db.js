import Database from 'better-sqlite3';

const db = new Database('./companion.db', { verbose: console.log });

export default db;

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS companions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS user_companions (
    user_id INTEGER,
    companion_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (companion_id) REFERENCES companions (id),
    PRIMARY KEY (user_id, companion_id)
  );
`);
