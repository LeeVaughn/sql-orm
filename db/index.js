const Sequelize = require('sequelize');

// uses a constructor function to pass an object with connection parameters
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

// exports the db object which holds the Sequelize and database configs and the models
db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;
