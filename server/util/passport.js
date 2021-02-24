const express = require('express');
const app = express();
const User = require('../models/userData');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategie = require('passport-facebook');
const FortyTwoStrategy = require('passport-42').Strategy;


app.use(passport.initialize());
// app.use(passport.session());


passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
   
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

passport.use(new GoogleStrategy({
    clientID: '960000611041-051bkhaggfe8qal7e32i5cd5uk58qes6.apps.googleusercontent.com',
    clientSecret: 'xsse-isKhX1FAoFLdW6a451E',
    callbackURL: "http://localhost:3001/auth/google/callback",
},
async function(accessToken, refreshToken, profile, done) {
    profile = profile._json;
    console.log(profile);
    await User.oauthFindUser(profile.sub).then((response) => {
        if(response[0].length === 0)
        {
            User.oauthRegister(profile.sub, profile.email, profile.name, profile.given_name, profile.family_name, '*', accessToken, 1, null, null)
            console.log('User created Successfully !');
            
        } else {
            console.log('Already Registred!');
        }
    }).catch((err) => { console.log('err :', err)})
    return done(null, profile);
}
));
passport.use(new FacebookStrategie({
    clientID: '1544409879102980',
    clientSecret: '1d536608537ff4f438cda31001dbad2b',
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'picture.type(large)'],  
    
},
async function(accessToken, refreshToken, profile, done) {
    profile = profile._json;
    // console.log(profile);
    console.log(profile.id, profile.email, profile.name, profile.first_name, profile.last_name, '*', accessToken);
    await User.oauthFindUser(profile.id).then((response) => {
        if(response[0].length === 0)
        {
            User.oauthRegister(profile.id, profile.email, profile.name, profile.first_name, profile.last_name, '*', accessToken, 1, null, null)
            console.log('User created Successfully !');
            
        } else {
            console.log('Already Registred!');
        }
    }).catch((err) => { console.log('err :', err)})
    // console.log(profile._json.  picture.data.url);
    return done(null, profile);
}
));

passport.use(new FortyTwoStrategy({
    clientID: '20f491d377058a167db0a75e03a027ecd8a3a812956eaab04ebe1531a61656ca',
    clientSecret: 'e99e4c1d7a09727529410dc14f22357ce37a5583c2287bb078466a210297e7f7',
    callbackURL: "http://localhost:3001/auth/42/callback",
    profileFields: {
        'id': function (obj) { return String(obj.id); },
        'username': 'login',
        'displayName': 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        'profileUrl': 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url'
      }
    
},
async function(accessToken, refreshToken, profile, done) {
    profile = profile._json;
    // console.log(profile);
   // console.log(profile.id, profile.email, profile.name, profile.first_name, profile.last_name, '*', accessToken);
   await User.oauthFindUser(profile.id).then((response) => {
       if(response[0].length === 0)
       {
           //
           User.oauthRegister(profile.id, profile.email, profile.login, profile.first_name, profile.last_name, '*', accessToken, 1, null, null)
           console.log('User created Successfully !');
           
       } else {
           // 
           console.log('Already Registred!');
       }
   }).catch((err) => { console.log('err :', err)})
    // console.log(profile._json.image_url);
    return done(null, profile);
}
));