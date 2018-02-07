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
(async () => {
    const res = await ref.once("value");
    console.log(res.val());
})();