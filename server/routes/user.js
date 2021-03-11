const userController = require('../controllers/user');
const validator = require('../controllers/validator');
const authVrfy = require('../middleware/autMiddleware')
const express = require('express');
const route = express.Router();
const passport = require('passport');

// Route to check if The user Filled all the required personal Informations

route.post("/user/userInfoVerification", userController.userInfoVerification);

//  post signUp
route.post('/users/signup', validator.validationInput, userController.signUp);

//  post login
route.post('/users/login' , validator.validationInput, userController.postLogin);

//  post Send Forget Password
route.post('/users/sendForget', validator.validationInput, userController.sendForget);

//  post forget password

route.post('/users/forget/:vkey', validator.validationInput, userController.forgetPassword);

//  post edit password

route.post('/users/edit/:id', validator.validationInput, userController.editPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

// post logout button

route.post('/logout', userController.logout);

// check if loggin

route.get('/users/checkLogin', authVrfy.requireAuth);

// oAuth2

// Google
route.get('/auth/google', userController.google);

route.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/error' }), userController.googleCallback);

// Faacebook

route.get('/auth/facebook', userController.facebook);

route.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), userController.facebookCallback);

//42
route.get('/auth/42', userController.intra);

route.get('/auth/42/callback', passport.authenticate('42', { failureRedirect: '/error' }), userController.intraCallback);


module.exports = route