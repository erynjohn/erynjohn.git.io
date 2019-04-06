var PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const expresshbs = require('express-handlebars');
const path = require('path');
require('dotenv').config()

const app = express();

//vew engine setup
app.engine('handlebars', expresshbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/hbs-routes")(app);

app.listen(PORT, () => console.log("server started on http://localhost:"+PORT));

