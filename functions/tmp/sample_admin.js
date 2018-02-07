"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const admin = require('firebase-admin');

// Fetch the service account key JSON file contents
var serviceAccount = require("../service-account-credentials.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://askme-scai.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref('/data/defaultsss/surveys');
//ref.once("value", function(snapshot) {
//  console.log(snapshot.val());
//});
_asyncToGenerator(function* () {
  const res = yield ref.once("value");
  console.log(res.val());
})();
//# sourceMappingURL=sample_admin.js.map