const express = require('express');
// generates an application that runs the express modules
// will listen to incoming requests and route them to handlers and send responses
// underlying express server
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// tells passport to use this specific Strategy
passport.use(new GoogleStrategy());

// creates a route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// heroku can set underlying environment variables when it creates the application for production so it sets the port that heroku needs
// so if there aren't any environment variables then this might not exist (heroku hasn't start up the app or we are working on dev)
// we use 'or' to set to port 3000 if this environment variable doesn't exist
const PORT = process.env.PORT || 3000;
// tells the node runtime to listen to on to this port
app.listen(PORT);
