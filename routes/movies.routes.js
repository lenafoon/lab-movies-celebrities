// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get ("/create", (req, res) => {
    const { title, genre, plot, cast } = req.body
    const newMovie = new Movie ({
        title,
        genre,
        plot,
        cast
    })
    newMovie
    .save()

    .then (() =>  res.redirect("/movies"))

    .catch((err)=> {
        console.error(err)
        res.render ("error")
    });
});


router.get("/", (req, res) => {
    Movie.find()

    .then(() => {
        res.render("movies/movies", { movies })
    })
    .catch((err) => {
        console.log(err)
        res.render("error")
    });
});


router.get("/:id", (req, res, next) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate("cast")

      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })

      .catch((error) => {
        console.log("Error retrieving movie details:", error);
        next(error);
      });
  });


  router.post("/:id/delete", (req, res, next) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect("/movies");
      })

      .catch((error) => {
        console.log("Error deleting movie:", error);
        next(error);
      });
  });


  router.get("/:id/edit", (req, res, next) => {
    const movieId = req.params.id;
  
    Promise.all([
      Movie.findById(movieId).populate("cast"),
      Celebrity.find(),
    ])
      .then(([movie, celebrities]) => {
        res.render("movies/edit-movie", { movie, celebrities });
      })
      
      .catch((error) => {
        console.log("Error editing movie:", error);
        next(error);
      });
  });

module.exports = router;