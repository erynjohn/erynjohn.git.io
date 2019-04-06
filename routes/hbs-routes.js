var path = require("path");
module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index', {title: "Eryn Monestero || Portfolio"});
      });
      app.get('/message_sent', (req, res) => {
        res.render('messageSent');
      });
      
      app.get('/eryn_monestero_resume', (req, res) => {
        res.render('resume');
      });
       
      app.post('/send', (req, res) => {
        const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
        const msg = {
          to: "johnmary1010@gmail.com",
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
}