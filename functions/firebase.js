'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.admin = admin;
exports.database = functions.database;
//# sourceMappingURL=firebase.js.map