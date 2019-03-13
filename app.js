var PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const expresshbs = require('express-handlebars');
const path = require('path');

const app = express();

//vew engine setup
app.engine('handlebars', expresshbs());
app.set('view engine', 'handlebars');
//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/message_sent', (req, res) => {
  res.render('messageSent');
});

app.get('/eryn_monestero_resume', (req, res) => {
  res.render('resume');
});

app.post('/send', (req, res) => {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.email,
    from: 'no_replay@erynmonestero.com',
    subject: 'It sent',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    templateId: 'd-b11508eedb7a4c36af5a07e67ab5a691',
    dynamic_template_data: {
      nameName: req.body.name,
      emailName: req.body.email,
      companyName: req.body.company,
      messageName: req.body.message,
    },
  };
  sgMail.send(msg).then(() => {

    console.log("message sent");
    res.render('messageSent');
  }).catch(error => {
    console.error(error);
  });
});

app.listen(PORT, () => console.log("server started"));
