require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// var fileupload = require("'express-fileupload'"); //ADDED
const sequelize = require('./config/connection');
const passport = require('passport');
const session = require('express-session');
const {cloudinary} = require('./utils/cloudinary');

var db = require("./config/models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(
	session({
	  secret: 'toaster struddle',
	  resave: true,
	  saveUninitialized: true
	})
 );

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
// app.use(fileupload({ //ADDED
//   useTempFiles: true
// }));

require('./config/passport')(passport);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/index.js");
// require("./routes/index.js")(app);
app.use(require('./routes/index.js'));
// require("./routes/htmlRoutes.js")(app);

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
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
