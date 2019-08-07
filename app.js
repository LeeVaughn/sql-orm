const db = require("./db");
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

// async IIFE
(async () => {
  // // sync Movies table
  // await Movie.sync();
  // sync all tables, drops tables if they exist and creates new ones each time the app starts
  await db.sequelize.sync({ force: true });

  try {
    // // tests a connection to the database
    // await sequelize.authenticate();
    // console.log("Connection to the database successful!");

    // builds a new Movie instance
    const movie = await Movie.create({
      title: "Toy Story",
      runtime: 81,
      releaseDate: "1995-11-22",
      isAvailableOnVHS: true,
    });
    // console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: "The Incredibles",
      runtime: 115,
      releaseDate: "2004-04-14",
      isAvailableOnVHS: true,
    });
    // console.log(movie2.toJSON());

    const movie3 = await Movie.build({
      title: "Toy Story 3",
      runtime: 103,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: false,
    });
    await movie3.save();
    // console.log(movie3.toJSON());

    const person = await Person.create({
      firstName: "Tom",
      lastName: "Hanks",
    });
    // console.log(person.toJSON());

    const person2 = await Person.create({
      firstName: "Brad",
      lastName: "Bird",
    });
    // console.log(person2.toJSON());

    const movieById = await Movie.findByPk(1);
    // console.log(movieById.toJSON());

    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    // console.log(movieByRuntime.toJSON());

    // const movies = await Movie.findAll();
    // console.log( movies.map(movie => movie.toJSON()) );

    // const movies = await Movie.findAll({
    //   attributes: ["id", "title", "releaseDate"],
    //   where: {
    //     releaseDate: {
    //       [Op.gte]: "1995-01-01"
    //     }
    //   },
    //   order: [["releaseDate", "ASC"]] // dates in ascending order
    // });
    // // console.log( movies.map(movie => movie.toJSON()) );

    const people = await Person.findAll({
      where: {
        lastName: 'Hanks'
      }
    });
    // console.log( people.map(person => person.toJSON()) );

    const toyStory3 = await Movie.findByPk(3);
    // //updates using dot notation
    // toyStory3.isAvailableOnVHS = true;
    // await toyStory3.save();
    // updates with the update() method
    await toyStory3.update({
      title: 'Trinket Tale 3', // new title
      isAvailableOnVHS: true,
    }, { fields: ['title', 'isAvailableOnVHS'] });
    // returns the same as calling .toJSON()
    // console.log( toyStory3.get({ plain: true }) );

    const toyStory = await Movie.findByPk(1);

    // Delete a record
    await toyStory.destroy();

    // Find and log all movies
    const movies = await Movie.findAll();
    console.log( movies.map(movie => movie.toJSON()) );

    // // another way to create a Movie instance without creating a variable
    // await Movie.create({
    //   title: "The Incredibles",
    // });

    // // you can also create multiple records at once
    // const movieInstances = await Promise.all([
    //   Movie.create({
    //       title: "Toy Story",
    //     }),
    //     Movie.create({
    //         title: "The Incredibles",
    //       }),
    // ]);
    // const moviesJSON = movieInstances.map(movie => movie.toJSON());
    // console.log(moviesJSON);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
