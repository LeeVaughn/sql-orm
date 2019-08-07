const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  // defines a new table in the database
  // the first arg is an object literal defining the model attributes, the second is an object literal that sets the model options
  Movie.init({
    title: Sequelize.STRING,
  }, { sequelize }); // same as { sequelize: sequelize }

  return Movie;
};
