const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import homeController from './controllers/home';
import contactController from './controllers/contacts';

//const homeController = require('./controllers/home');
//const contactController = require('./controllers/contacts');

app.use('/', homeController);
app.use('/contacts', contactController);


var a = { ... b};
/*
(async () => {
  const a = await dothings();
  console.log(a);

})();
*/

app.get("/hi", (req, res) => {
  res.send("i")
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send({body: req.body});
});

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  //res.redirect('/404.html');
});




exports.app = functions.https.onRequest(app);

const a = { a: 1, b: 2};
const b = { ...a };