const {Sequelize} = require('sequelize')
require('dotenv').config();

let conexaoBanco;

if (process.env.DATABASE_URL) {
  // Configurao para produo (Render, Heroku, etc)
  conexaoBanco = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Configurao para desenvolvimento local
  conexaoBanco = new Sequelize(process.env.DB_NOME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  });
}

module.exports = conexaoBanco;
