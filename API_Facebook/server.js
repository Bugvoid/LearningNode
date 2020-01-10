var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");

mongoose.connect("mongodb://localhost/local");
require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "anystringoftext", saveUninitialized: true, resave: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");

// app.use('/', function(req, res){
// 	res.send('Firts TEste for facebook id :' fc_id);
// 	console.log(req.cookies);
// 	console.log('=');
// 	console.log(req.session);
// });

require("./src/routes")(app, passport);

app.listen(port);
console.log("Server running on port: " + port);
