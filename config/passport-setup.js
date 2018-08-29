const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then( (user) =>{
    done(null, user)
  })
  done(null, user.id)
});

passport.use(
  new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {

  //console.log(profile);

  //check if user exist in DB
  User.findOne({googleId:profile.id}).then( (currentUser) =>{
    if(currentUser){
      //User exist in DB
      console.log("user is : " + profile.id);
      done(null, currentUser);


    }else{
      // new user signed in..create user in our DB
      new User({
        username: profile.displayName,
        googleId: profile.id
      }).save().then( (newUser) => {
        done(null, newUser);

      });
    }
  })


}));
