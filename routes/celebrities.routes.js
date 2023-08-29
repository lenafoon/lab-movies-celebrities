// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


// all your routes here

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
  });
  

  router.post("/celebrities/create", async (req, res) => {
    try {
      const { name, occupation, catchPhrase } = req.body;

    await Celebrity.create({ name, occupation, catchPhrase });
      res.redirect("/celebrities");
    } 
    catch (error) {
      console.error(error);
      res.render("celebrities/new-celebrity", { errorMessage: "Error adding celebrity." });
    }
  });
  

  router.get("/celebrities", async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render("celebrities/celebrities", { celebrities });
    } 
    catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports = router;