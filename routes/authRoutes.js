const passport = require('passport');
/*
  creates a route handler that makes passport handle the google oauth
  using 'google' will make passport use the GoogleStrategy
  Google, internally, has scopes that in which you can take out aka: profile and email
*/

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  /*
  passport will automatically handle authentication with the 'code' that is sent back
  no need to apply logic
*/
  app.get('/auth/google/callback', passport.authenticate('google'));

  /*
    passport handles adding user in the request body after logging in
  */
  app.get('/api/logout', (req, res) => {
    req.logout(); // passport does this functionality
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
