import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((req, res) => {
  const name = req.query.text;
  functions.logger.info(`Hello ${name}!`, {structuredData: true});
  res.send("Hello from Firebase!");
});
