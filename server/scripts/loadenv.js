const fs = require('fs');
const envExists = fs.existsSync('.env');
if (fs.existsSync('.env')) {
  console.log('.env file already exists');
  process.exit();
}

// Used on the server-side to fetch the env file,
// Auth on google's servers is handled automatically
const gcs = require('@google-cloud/storage')();
const bucket = `${GOOGLE_CLOUD_PROJECT}.appspot.com`;
gcs
  .bucket(bucket)
  .file('/env/.env')
  .download({destination: '.env'})
  .then(() => {
    console.info('downloaded .env file');
  })
  .catch(err => {
    console.error(err);
  });


