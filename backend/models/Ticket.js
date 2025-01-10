// Ticket.js
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Aberto',
    },
  });

  return Ticket;
};
