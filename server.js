// -----------------------------------------------------------------------------
// Program:  server.js
// Purpose:  Application Startup.
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Team Genesis
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
require("dotenv").config();
const sequelize = require('./config/connection');  // ORM - manage database access
const bodyParser = require('body-parser');         // Receive POST vlaues in Express
const express = require("express");                // Routing
const exphbs = require("express-handlebars");      // Server side html rendering
const session = require('express-session');        // Session state
const validator = require('express-validator');    // Validate input data

const passport = require('passport');              // Manage User Login
require('./config/passport')(passport);
const {cloudinary} = require('./utils/cloudinary'); //Utility for image uploading for items listed

var db = require("./config/models");

let app = express();
let PORT = process.env.PORT || 3000;


// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------
 app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  resave: true,
	  saveUninitialized: true,
	  proxy: true
	})
 );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());



// Handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Routes
// app.use(require('./routes/index.js'));
app.use(require('./controllers/index.js'));


var syncOptions = { force: false };
// var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`,
    );
  });
});


// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------
module.exports = app;
