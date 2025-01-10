const { Ticket } = require("../models");

// Criar um novo chamado
const createTicket = async (req, res) => {
  const { descricao, tipo } = req.body;

  if (!descricao || !tipo) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const newTicket = await Ticket.create({
      descricao,
      tipo,
    });
    res.status(201).json({ message: 'Chamado criado com sucesso!', ticket: newTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o chamado.' });
  }
};

// Listar todos os chamados
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter os chamados.' });
  }
};

module.exports = { createTicket, getTickets };
