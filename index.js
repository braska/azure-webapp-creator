const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);
