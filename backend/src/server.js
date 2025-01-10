const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const { sequelize, Chamado } = require('../models');

const app = express();

// Configuração de CORS com múltiplas origens
const allowedOrigins = [
  'http://localhost:5173', // Origem do desenvolvimento local
  'https://cerne-beta.vercel.app', // Origem da produção no Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origem (ex.: Postman) ou verificar se a origem é permitida
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
}));

// Middleware para processar o corpo das requisições
app.use(express.json());

// Rota de verificação de conexão com o banco
app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate(); // Verifica a conexão com o banco
    res.send('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    res.status(500).send('Não foi possível conectar ao banco de dados: ' + error.message);
  }
});

// Rota para criar um novo chamado
app.post('/chamados', async (req, res) => {
  try {
    const novoChamado = await Chamado.create({
      descricao: req.body.descricao, // Recebe a descrição do corpo da requisição
      tipo: req.body.tipo,           // Recebe o tipo do corpo da requisição
      status: req.body.status || 'Aberto', // Status padrão: Aberto
    });
    res.status(201).json(novoChamado);
  } catch (error) {
    res.status(500).send('Erro ao criar chamado: ' + error.message);
  }
});

// Rota para listar todos os chamados
app.get('/chamados', async (req, res) => {
  try {
    const chamados = await Chamado.findAll(); // Busca todos os chamados
    res.json(chamados);
  } catch (error) {
    res.status(500).send('Erro ao listar chamados: ' + error.message);
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Tenta sincronizar o banco de dados
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
});
