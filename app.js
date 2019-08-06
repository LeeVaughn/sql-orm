const Sequelize = require('sequelize');
// uses a constructor function to pass an object with connection parameters
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});