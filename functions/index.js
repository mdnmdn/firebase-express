'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _home = require('./controllers/home');

var _home2 = _interopRequireDefault(_home);

var _contacts = require('./controllers/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const homeController = require('./controllers/home');
//const contactController = require('./controllers/contacts');

app.use('/', _home2.default);
app.use('/contacts', _contacts2.default);

/*
(async () => {
  const a = await dothings();
  console.log(a);

})();
*/

app.get("/hi", (req, res) => {
  res.send("i");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  //res.redirect('/404.html');
});

exports.app = functions.https.onRequest(app);

const a = { a: 1, b: 2 };
const b = _extends({}, a);
//# sourceMappingURL=index.js.map