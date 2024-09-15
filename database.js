// database.js
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Cria a tabela de categorias, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);
});

// Função para inserir uma categoria
function insertCategory(name, callback) {
  const query = `INSERT INTO categories (name) VALUES (?)`;
  db.run(query, [name], function (err) {
    if (err) {
      console.error('Erro ao inserir categoria:', err.message);
      callback(err);
    } else {
      callback(null, { id: this.lastID, name });
    }
  });
}

// Função para buscar todas as categorias
function getCategories(callback) {
  const query = `SELECT * FROM categories`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar categorias:', err.message);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

// Função para atualizar uma categoria
function updateCategory(id, name, callback) {
  const query = `UPDATE categories SET name = ? WHERE id = ?`;
  db.run(query, [name, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar categoria:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Categoria não encontrada'));
    } else {
      callback(null, { id, name });
    }
  });
}

// Função para deletar uma categoria
function deleteCategory(id, callback) {
  const query = `DELETE FROM categories WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar categoria:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Categoria não encontrada'));
    } else {
      callback(null, { message: 'Categoria deletada com sucesso!' });
    }
  });
}

// Cria a tabela de usuários, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT,
      modelo TEXT,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
    )
  `);
});

// Função para inserir um usuário
function insertUser(name, email, callback) {
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.run(query, [name, email], function (err) {
    if (err) {
      console.error('Erro ao inserir usuário:', err.message);
      callback(err);
    } else {
      callback(null, { id: this.lastID, name, email });
    }
  });
}

// Função para buscar todos os usuários
function getUsers(callback) {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err.message);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

// Função para atualizar um usuário
function updateUser(id, name, email, callback) {
  const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  db.run(query, [name, email, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar usuário:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Usuário não encontrado'));
    } else {
      callback(null, { id, name, email });
    }
  });
}

// Função para deletar um usuário
function deleteUser(id, callback) {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar usuário:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Usuário não encontrado'));
    } else {
      callback(null, { message: 'Usuário deletado com sucesso!' });
    }
  });
}

// Função para inserir um carro com uma categoria
function insertCarro(marca, modelo, category_id, callback) {
  const query = `INSERT INTO cars (marca, modelo, category_id) VALUES (?, ?, ?)`;
  db.run(query, [marca, modelo, category_id], function (err) {
    if (err) {
      console.error('Erro ao inserir carro:', err.message);
      callback(err);
    } else {
      callback(null, { id: this.lastID, marca, modelo, category_id });
    }
  });
}

// Função para buscar todos os carros com suas respectivas categorias
function getCarro(callback) {
  const query = `
    SELECT cars.id, cars.marca, cars.modelo, categories.name as category_name
    FROM cars
    LEFT JOIN categories ON cars.category_id = categories.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar carros:', err.message);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

// Função para atualizar um carro e sua categoria
function updateCarro(id, marca, modelo, category_id, callback) {
  const query = `UPDATE cars SET marca = ?, modelo = ?, category_id = ? WHERE id = ?`;
  db.run(query, [marca, modelo, category_id, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar carro:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Carro não encontrado'));
    } else {
      callback(null, { id, marca, modelo, category_id });
    }
  });
}

// Função para deletar um carro
function deleteCarro(id, callback) {
  const query = `DELETE FROM cars WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar carro:', err.message);
      callback(err);
    } else if (this.changes === 0) {
      callback(new Error('Carro não encontrado'));
    } else {
      callback(null, { message: 'Carro deletado com sucesso!' });
    }
  });
}

// Exporta as funções
module.exports = {
  insertUser,
  getUsers,
  updateUser,
  deleteUser,
  insertCarro,
  getCarro,
  updateCarro,
  deleteCarro,
  insertCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  db,
};
