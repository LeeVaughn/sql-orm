const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  // defines a new table in the database
  // the first arg is an object literal defining the model attributes, the second is an object literal that sets the model options
  Movie.init({
    // set custom primary key column
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'title'",
        },
        notEmpty: {
          msg: "Please provide a value for 'title'",
        }
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'runtime'",
        },
        min: {
          args: 1,
          msg: "Please provide a value greater than '0' for 'runtime'",
        },
      },
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'releaseDate'",
        },
        isAfter: {
          args: "1895-12-3-27",
          msg: "Please provide a value on or after '1895-12-28' for 'releaseDate'",
        },
      },
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'title'",
        },
      },
    },
  }, { sequelize }); // same as { sequelize: sequelize }

  return Movie;
};
