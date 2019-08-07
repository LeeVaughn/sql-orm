const db = require("./db");
const { Movie } = db.models;

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
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: "The Incredibles",
      runtime: 115,
      releaseDate: "2004-04-14",
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

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
    console.log("Error connecting to the database: ", error)
  }
})();
