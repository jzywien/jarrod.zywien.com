const admin = require('firebase-admin');
const path = require('path');
const {
  FIREBASE_SECRETS_FILE,
  FIREBASE_DB
} = process.env;
const serviceAccount = require(`./keys/${FIREBASE_SECRETS_FILE}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DB
});

const validate = async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log(`*** User Id: ${uid}`);
    next();
  } catch(err) {
    res.status(403).send({auth: false, message: 'Failed to authenticate token.'});
  }
};

module.exports = validate;