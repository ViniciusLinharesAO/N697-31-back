// index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { insertUser, getUsers, updateUser, deleteUser, deleteCarro, insertCarro, getCarro, updateCarro, insertCategory, getCategories, updateCategory, deleteCategory, } = require('./database'); // Importa as funções do database.js

// Inicializa o app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor com SQLite e Express!');
});

// Rota para inserir um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  insertUser(name, email, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    } else {
      res.status(201).json({ message: 'Usuário inserido com sucesso!', user });
    }
  });
});

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  getUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    } else {
      res.json(users);
    }
  });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  updateUser(id, name, email, (err, updatedUser) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao atualizar usuário' });
    } else {
      res.json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    }
  });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  deleteUser(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao deletar usuários' });
    } else {
      res.json(result);
    }
  });
});

// Rota para inserir um novo carro
app.post('/cars', (req, res) => {
  const { marca, modelo } = req.body;
  insertCarro(marca, modelo, (err, cars) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao inserir carro' });
    } else {
      res.status(201).json({ message: 'Carro inserido com sucesso!', cars });
    }
  });
});

// Rota para obter todos os carro
app.get('/cars', (req, res) => {
  getCarro((err, cars) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar carro' });
    } else {
      res.json(cars);
    }
  });
});

// Rota para atualizar um carro
app.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const { marca, modelo } = req.body;
  updateCarro(id, marca, modelo, (err, updatedCarro) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao atualizar carro' });
    } else {
      res.json({ message: 'Carro atualizado com sucesso!', cars: updatedCarro });
    }
  });
});

// Rota para deletar um carro
app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  deleteCarro(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao deletar carro' });
    } else {
      res.json(result);
    }
  });
});

/* Rotas de Categorias */

// Rota para inserir uma nova categoria
app.post('/categories', (req, res) => {
  const { name } = req.body;
  insertCategory(name, (err, category) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao inserir categoria' });
    } else {
      res.status(201).json({ message: 'Categoria inserida com sucesso!', category });
    }
  });
});

// Rota para obter todas as categorias
app.get('/categories', (req, res) => {
  getCategories((err, categories) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    } else {
      res.json(categories);
    }
  });
});

// Rota para atualizar uma categoria
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  updateCategory(id, name, (err, updatedCategory) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao atualizar categoria' });
    } else {
      res.json({ message: 'Categoria atualizada com sucesso!', category: updatedCategory });
    }
  });
});

// Rota para deletar uma categoria
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  deleteCategory(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message || 'Erro ao deletar categoria' });
    } else {
      res.json(result);
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
