// var db = require("../..../config/models");
const path=require("path");
// const { router } = require("../server");
const router = require('express').Router();
// function(app) {
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

  router.get("/profile", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/html/profile.html"));
  });

  router.get("/sell", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/html/sell.html"));
  });

  // Render 404 page for any unmatched routes
  router.get("*", function(req, res) {
    // console.log(req);
    res.render("404");
  });

module.exports = router;

