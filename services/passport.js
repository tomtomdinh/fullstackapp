const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// user is what we just pulled out of the database
passport.serializeUser((user, done) => {
  done(null, user.id); // done is a callback, this user.id is set by the database (NOT profile.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/*
  tells passport to use this specific Strategy
*/
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // async call that returns a promise
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have a record with the given profile ID

          // first parameter is an error object, so if user exists we just pass in null
          done(null, existingUser);
        } else {
          // no record with the ID
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user)); // can add extra properties before sending back to server
        }
      });
    }
  )
);
