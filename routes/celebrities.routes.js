// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


// all your routes here

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {

    const { name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase});

    newCelebrity
    .save()
    .then(() => {
        res.redirect("/celebrities")
        })
    .catch((err) => {
        res.render("celebrities/new-celebrity");
    })

});


router.get("/celebrities", (req, res) => {
    Celebrity.find()
    .then(() => {
        res.render("celebrities/celebrities", {celebrities})
    })
    .catch((err) => {
    res.render("celebrities/celebrities");
})
    

})

module.exports = router;