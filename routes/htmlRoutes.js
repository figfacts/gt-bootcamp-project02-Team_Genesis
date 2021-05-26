// var db = require("../../config/models");
const path=require("path");

const router = require('express').Router();

// module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });
  router.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/homepage.html"));
  });

  // Load example page and pass in an example by id
  router.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  router.get("*", function(req, res) {
    console.log(req);
    res.render("404");
  });
// };

module.exports = router;