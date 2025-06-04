const { Sequelize } = require('sequelize');

// Create a Sequelize instance connected to your DB (adjust credentials)
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', // or 'mysql', 'sqlite', etc.
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Todo = require('./todo')(sequelize, Sequelize);

module.exports = db;
