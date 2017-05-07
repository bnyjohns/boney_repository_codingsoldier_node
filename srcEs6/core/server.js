import express from 'express';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';
import cookie from 'cookie-parser';
import path from 'path';
import Routes from './routes';
import Data from '../data/index';

let publicAssetsPath = path.resolve(__dirname,  "../public");
let app = express();
let routes = new Routes();

//Configure app
Data.seed();
app.use(cookie());
app.use(session({secret : "MagicSecret"}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicAssetsPath));
routes.init(app); //Issue line

app.set('views', './src/views');
app.set('view engine','vash');

app.listen(4000, function(){
    console.log("Coding Soldier listening on port 4000");
});

 


