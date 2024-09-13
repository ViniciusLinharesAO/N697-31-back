// index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { insertUser, getUsers, updateUser, deleteUser } = require('./database'); // Importa as funções do database.js

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
      res.status(500).json({ error: err.message || 'Erro ao deletar usuário' });
    } else {
      res.json(result);
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
