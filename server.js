const express = require('express');
const bodyParser = require('body-parser');
const expresshbs = require('express-handlebars');
const path = require('path');


const app = express();

app.engine('handlebars', expresshbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/message_sent', (req, res) => {
  res.render('messageSent');
});

app.post('/send', (req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'johnmary1010@gmail.com',
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



app.listen(3000, () =>  console.log("server running"));

