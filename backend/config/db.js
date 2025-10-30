import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database(':memory:');

const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      description TEXT
    )`);

    db.run(`CREATE TABLE cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      userId TEXT DEFAULT 'user_1',
      FOREIGN KEY (productId) REFERENCES products(id)
    )`);

    db.run(`CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      total REAL NOT NULL,
      timestamp TEXT NOT NULL,
      items TEXT NOT NULL
    )`);

    console.log('Database tables created successfully');
    });
};

export default db;
export { initializeDatabase };