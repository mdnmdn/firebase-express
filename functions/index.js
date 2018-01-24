const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.root = functions.https.onRequest((request, response) => {
  response.send("wow!");
});

exports.wow2 = functions.https.onRequest((request, response) => {
  response.send("wow2!");
});

exports.version =
  functions.https.onRequest((request, response) => {
    response.send("v: " + process.versions.node);
});