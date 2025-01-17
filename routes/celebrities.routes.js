// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// Create a route for adding new celebrities

router.get("/celebrities/create", (req, res, next) => {
   
            res.render("celebrities/new-celebrity");
        });

router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(celebrityDetails)
        .then(celebrityDetails => {
            res.redirect("/celebrities");
        })
        .catch(err => {
            console.log("error creating new book in DB", err);
            res.render("celebrities/new-celebrity");
            next();
        })
});


router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities });
        })
        .catch(err => {
            console.log('Error getting authors from DB...', err);
            next(err);
        })
});

module.exports = router;