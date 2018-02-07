'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');

//https://stackoverflow.com/questions/45065826/firebase-serve-only-functions-admin-auth-locally-does-not-work-unless-i-man
var serviceAccount = require("./service-account-credentials.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://askme-scai.firebaseio.com/"
});
//admin.initializeApp(functions.config().firebase);

console.log('admin', functions.config());

exports.admin = admin;
exports.database = functions.database;
//# sourceMappingURL=firebase.js.map