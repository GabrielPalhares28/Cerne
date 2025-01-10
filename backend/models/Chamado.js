// Chamado.js
module.exports = (sequelize, DataTypes) => {
    const Chamado = sequelize.define('Chamado', {
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
        allowNull: false,
        defaultValue: 'Aberto',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  
    return Chamado;
  };
  