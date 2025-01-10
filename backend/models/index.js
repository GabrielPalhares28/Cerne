// index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');  // ou qualquer configuração de banco de dados

// Importando os modelos e passando o sequelize
const Chamado = require('./Chamado')(sequelize, DataTypes);
const Ticket = require('./Ticket')(sequelize, DataTypes); // Certifique-se de que o arquivo 'Ticket.js' está exportando de maneira similar

// Associando os modelos, se necessário
// Chamado.associate && Chamado.associate(sequelize.models);
// Ticket.associate && Ticket.associate(sequelize.models);

// Exportando a instância do Sequelize e os modelos
module.exports = { sequelize, Chamado, Ticket };
