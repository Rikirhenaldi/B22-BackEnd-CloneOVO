const admin = require('firebase-admin')
const serviceAccount = require("../config/clone-ovo-firebase-adminsdk-ciba6-597e7bde8d.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebase