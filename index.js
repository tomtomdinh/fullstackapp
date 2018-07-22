const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// no need for a return statement for passport since we aren't exporting anything specific
// order of operations matter, need to create the User schema first
require('./models/User');
require('./services/passport');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

/* generates an application that runs the express modules
   will listen to incoming requests and route them to handlers and send responses
   underlying express server
 */
const app = express();

/*
  using middleware that takes incoming requests and makes adjustment to it before
  being sent to the route handlers. (pre-processing)
  instead of adding logic in every single route handler to check authentication
  we can use middleware to do this for us for every route handler
*/
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// immediately invokes the function that is exported
require('./routes/authRoutes')(app);

// heroku can set underlying environment variables when it creates the application for production so it sets the port that heroku needs
// so if there aren't any environment variables then this might not exist (heroku hasn't start up the app or we are working on dev)
// we use 'or' to set to port 3000 if this environment variable doesn't exist
const PORT = process.env.PORT || 3000;
// tells the node runtime to listen to on to this port
app.listen(PORT);
