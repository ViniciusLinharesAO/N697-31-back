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

// Cria a tabela de usuários, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
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

// Exporta as funções
module.exports = {
  insertUser,
  getUsers,
  updateUser,
  deleteUser,
  insertCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  db,
};
