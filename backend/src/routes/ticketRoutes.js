const express = require('express');
const router = express.Router();
const { createTicket, getTickets } = require('../controllers/ticketController');

// Rota para criar um novo chamado
router.post('/', createTicket);

// Rota para listar todos os chamados
router.get('/', getTickets);

module.exports = router;
