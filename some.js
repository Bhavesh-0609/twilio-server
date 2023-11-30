const express = require('express');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const client = require('twilio')('AC17dc9fe91f769fba66f6e8611597b0b7', 'a711784e93afa41bac98122cd59f3453');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/outgoing-call', (req, res) => {
  const twiml = new VoiceResponse();

  twiml.gather({
    numDigits: 1,
    action: '/handle-key',
    method: 'POST'
  }, gatherNode => {
    gatherNode.say('Press 1 to confirm your choice.');
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle-key', (req, res) => {
  const digitPressed = req.body.Digits;
  console.log(`Digit pressed: ${digitPressed}`);

  // Add logic to handle the pressed digit

  const twiml = new VoiceResponse();
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


