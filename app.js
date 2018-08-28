const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

//connect to mongobd
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("mongo connected");
})

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log("listening");
});
