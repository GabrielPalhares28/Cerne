'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Chamados', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Aberto',  // Valor padrão para status
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Chamados', 'status');
  }
};
