const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// import passport from 'passport';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:8000/google/callBack"
//   },

//   function(accessToken, refreshToken, profile, done) {
//        User.findOrCreate({ googleId: profile.id }, function (err, user) {
//          return done(err, user);
//        });
//   }
// ));

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: 'http://localhost:8000/google/callBack'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                // User already exist
                // console.log('User exist', currentUser);
                return done(currentUser);
            } else {
                // User not found
                const createUser = new User({
                    googleId: profile.id,
                    username: profile.displayName
                });
                createUser.save().then((newUser) => {
                    // console.log('new user created: ', createUser);
                    return done(newUser);
                });
            }
        })
    })
);
