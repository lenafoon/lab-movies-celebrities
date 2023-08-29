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


router.get('/movies/create', async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { celebrities });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/movies/create', async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect('/movies');
  } 
  catch (error) {
    console.error(error);
    res.render('movies/new-movie', { error });
  }
});



router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    res.render('movies/movie-details', { movie });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/movies/:id/delete', async (req, res) => {
  try {

  await Movie.findByIdAndRemove(req.params.id);
    res.redirect('/movies');
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/movies/:id/edit', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    const celebrities = await Celebrity.find();
    res.render('movies/edit-movie', { movie, celebrities });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/movies/:id/edit', async (req, res) => {
  try {
    
  await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;