import { Express } from "express";
import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import GoogleOauth20 from 'passport-google-oauth20';
const keys = require("../config/keys");

import { User, userDoc, userProps } from "../models/User";



/* I had the following issues when i tried to migrate this file to ts:

1. extend express user with my user model: https://github.com/DefinitelyTyped/DefinitelyTyped/commit/91c229dbdb653dbf0da91992f525905893cbeb91#r34805708-> TypeError: Unable to require file: models\User.ts

2. Done is not a function: https://github.com/jaredhanson/passport/issues/421 */
type userType = Express.User & {_id?:string}

passport.serializeUser((user:userType, done) => {
	// reason1: we use user._id which is the database id, cause we could implement multiple strategy exclude google
	// reason2: Google Auth separate concern, we use our own id from here, ty
	User.findById(user._id).then((user) => {
		if(user){
			try{
				done(null, user._id);
			}catch(err){
				console.log(err)
			}
		}
		
		
	});
});

passport.deserializeUser((_id, done) => {
	User.findById(_id).then((user) => {
		done(null, user);
	});
});

interface GoogleProfile {
	id?:string
}

//new GoogleStrategy inicialization with config, might define multiple strategy like this
const GoogleStrategy = GoogleOauth20.Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true,
			passReqToCallback:false,
   
    
		},
		
		function (accessToken, refreshToken, profile:GoogleProfile, done) {
			// Do stuff with the profile like add it to your DB.
			User.findOne({
				googleId: profile.id,
			})
				.then((dbUserRecord) => {
					if (dbUserRecord) {
						// This user was found in our database since they already logged in before.
						done(null, dbUserRecord);
					} else {
						// This is a new user so lets create a new entry for them.
						const newUser = new User({
							googleId: profile.id,
						});

						// Here we save the new user to our database
						newUser.save().then((newUser) => {
							// When done is called, it sends us back to the callback URL defined on line 8
							done(null, newUser);
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	)
);

/*async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			// user is what we get back from the db
			done(null, user);
		} */
