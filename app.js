const express = require('express')
const routes = require('./routes')
const user = require('./routes/user')
const http = require('http')
const path = require('path');
const bodyParser=require("body-parser");

const app = express();


// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login page
app.get('/signup', user.signup);//call for signup page


app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login


port = 8080
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
