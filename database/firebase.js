const admin = require('firebase-admin');
const path = require('path')

const serviceAccount = path.join(
    __dirname,
    `../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`
)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin