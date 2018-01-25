const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

const homeController = require('./controllers/home');
const contactController = require('./controllers/contacts');

app.use('/', homeController);
app.use('/contacts', contactController);

app.get("/hi", (req, res) => {
  res.send("i")
});


app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  //res.redirect('/404.html');
});


exports.app = functions.https.onRequest(app);