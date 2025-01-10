const { Sequelize } = require("sequelize");

// Configurando o Sequelize para conectar ao SQLite em memória
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // Banco de dados em memória
  logging: false, // Para evitar logs excessivos no console
});

// Testar conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

module.exports = sequelize;
