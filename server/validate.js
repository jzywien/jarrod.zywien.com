const admin = require('firebase-admin');
const serviceAccount = require('./keys/jzywien-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://jzywien.firebaseio.com'
});

const validate = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('***** validating *****');

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