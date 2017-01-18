var express = require("express");
var app = express();
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var cookie = require('cookie-parser');
var routes = require('./routes');

//Configure app
app.use(cookie());
app.use(session({secret : "MagicSecret"}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
routes.init(app);

app.set('view engine','vash');

app.listen(4000, function(){
    console.log("Coding Soldier listening on port 4000");
});

 


