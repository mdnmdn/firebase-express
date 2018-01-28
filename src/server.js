import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// based on https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import homeController from './controllers/home';
import contactController from './controllers/contacts';

import schema from './graphql/schema';

app.use('/', homeController);
app.use('/contacts', contactController);

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


export {
  app
};

//exports.app = functions.https.onRequest(app);

