const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const session = require("express-session");

require('dotenv').config()

const app = express();



//mongodb
mongoose.connect('mongodb://mongo:27017/todo_express',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB Conectada'))
    .catch(err => console.log(err)
);
//cookie
const sess = {
    secret: 'ausazko hitz multzoa',
    cookie: {maxAge: 1000*60*2}
  }
  app.use(cookieParser());
  app.use(session(sess))

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//rutes
app.use(require('./routes/index'));
app.use(require('./routes/todo'));
//app.use(require('./routes/user'));

//server connection
app.listen(3000, () => console.log('Server on port: 3000'));