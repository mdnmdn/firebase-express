'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _home = require('./controllers/home');

var _home2 = _interopRequireDefault(_home);

var _survey = require('./controllers/survey');

var _survey2 = _interopRequireDefault(_survey);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const inspector = require('inspector');
//inspector.open();
//console.log('inspector: ', inspector.url());

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log('headers!!');
  // inject default headers
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const instanceMiddleware = (req, res, next) => {
  req.instance = req.params.instance || 'default';
  console.log('instance: ', req.instance);
  next();
};

app.use('/', _home2.default);
app.use('/survey', instanceMiddleware, _survey2.default);
app.use('/:instance/survey', _survey2.default);

// The GraphQL endpoint
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

/*
(async () => {
  const a = await dothings();
  console.log(a);

})();
*/

app.get("/hi", (req, res) => {
  console.log('hi!');
  res.header('X-Wow', 'hi!');
  res.send("hi");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  //res.redirect('/404.html');
});

exports.app = app;

//exports.app = functions.https.onRequest(app);
//# sourceMappingURL=server.js.map