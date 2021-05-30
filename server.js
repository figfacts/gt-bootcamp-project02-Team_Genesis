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

// Are we using this? Do we need it?
var db = require("./config/models");

let app = express();
let PORT = process.env.PORT || 3000;


// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------
// app.use(
// 	session({
// 	  secret: 'toaster struddle',
// 	  resave: true,
// 	  saveUninitialized: true
// 	})
//  );
 app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  resave: true,
	  saveUninitialized: true
	})
 );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.use(require('./routes/index.js'));
// require("./routes/htmlRoutes.js")(app);
// require("./routes/index.js");
// require("./routes/index.js")(app);

var syncOptions = { force: false };
// var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
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
