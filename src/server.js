import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const inspector = require('inspector');
inspector.open();
console.log('inspector: ', inspector.url());

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import homeController from './controllers/home';
import surveyController from './controllers/survey';

import schema from './graphql/schema';
import { inspect } from 'util';


app.use(function(req, res, next) {
  console.log('headers!!');
  // inject default headers
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const instanceMiddleware = (req ,res ,next) => {
  req.instance = req.params.instance || 'default';
  console.log('instance: ', req.instance);
  next(); 
};

app.use('/', homeController);
app.use('/survey',  instanceMiddleware, surveyController);
app.use('/:instance/survey', surveyController);

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


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
  res.send({body: req.body});
});

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  //res.redirect('/404.html');
});


export {
  app
};

//exports.app = functions.https.onRequest(app);

