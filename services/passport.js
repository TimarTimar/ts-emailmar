const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys = require('../config/keys');

const User=mongoose.model('users');

passport.serializeUser((user, done)=>{
    // reason1: we use user.id which is the database id, cause we could implement multiple strategy exclude google
    // reason2: Google Auth separate concern, we use our own id from here, ty
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user=>{done(null, user)})
});

//new GoogleStrategy inicialization with config, might define multiple strategy like this
passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) =>{
            User.findOne({googleId:profile.id})
            .then((existingUser)=>{
                if (existingUser){
                    //we already have a record with the given id
                    done(null, existingUser);
                }else{
                    //we dont have a record with this id, make a new rekord
                    new User({googleId:profile.id})
                    .save()
                    // user is what we get back from the db
                    .then(user=>done(null, user));
                }
            });
        }
    )
);

