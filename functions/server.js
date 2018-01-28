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

var _contacts = require('./controllers/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/', _home2.default);
app.use('/contacts', _contacts2.default);

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

exports.app = app;

//exports.app = functions.https.onRequest(app);
//# sourceMappingURL=server.js.map