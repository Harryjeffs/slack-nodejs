'use strict';
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const getResponses = require('./modules/form/getResponses');
const initalInteraction = require('./modules/form/interaction');

const { createMessageAdapter } = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter("44c6b4fbd8662761842c81f7bc5c8d75");



// [START get user]
app.post('/getResponses', async (req, res) => {
    getResponses.handler(req,res);
});
// [END get user]

// [START claim]
app.post('/acceptClient', async (req, res) => {
    slackInteractions.expressMiddleware();
    initalInteraction.handler(req,res);
});
// [END claim]

// Example: If you're using a body parser, always put it after the message adapter in the middleware stack
app.use(bodyParser());

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);

