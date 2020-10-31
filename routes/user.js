import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/fail', (req, res) => {
    res.send('Authentication failed!!!')
})

router.get('/good', (req, res) => {
    console.log('Logged in user!!!!!!!!', req.user)
    res.send(`welcome ${req.user.email}`)
})

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
    res.redirect('/good');
  });

export default router;
