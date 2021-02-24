const User = require("../models/userData");
const Tag = require("../models/tagData");
const Helpers = require("../util/Helpers");
const jwt = require("jsonwebtoken");
const passport = require('passport');

exports.signUp = async (req, res, next) => {
  var dataErr = {},
    tmp = [],
    toSend = {};

  await User.UserNameModel(req.body.userName).then(([user]) => {
    user.map((el) => {
      el.userName === req.body.userName
        ? (dataErr.userNameErr = "Username already exist !")
        : "";
    });
  });
  await User.UserEmailModel(req.body.email).then(([user]) => {
    user.map((el) => {
      el.email === req.body.email
        ? (dataErr.emailErr = "email already exist !")
        : "";
    });
  });
  req.body.password !== req.body.cnfrmPassword
    ? (dataErr.passErr = "Confirm Your Password!")
    : "";
  toSend = { ...dataErr, ...res.locals.input };
  tmp.push(toSend);
  const checkErr = tmp.map((el) => {
    return el["userNameErr"] === undefined &&
      el["emailErr"] === undefined &&
      el["passErr"] === undefined &&
      el["validEmailErr"] === undefined &&
      el["validUserNameErr"] === undefined &&
      el["validFirstNameErr"] === undefined &&
      el["validLastNameErr"] === undefined &&
      el["validPassErr"] === undefined &&
      el["validCnfpErr"] === undefined
      ? 0
      : 1;
  });

  if (!checkErr.includes(1)) {
    var vkey = Helpers.keyCrypto(req.body.userName);
    var url =
      "<a  href='http://localhost:3000/confirm/" +
      vkey +
      "'>Confirm your email</a>";
    const user = new User(
      null,
      req.body.email,
      req.body.userName,
      req.body.firstName,
      req.body.lastName,
      Helpers.keyBcypt(req.body.password),
      vkey,
      null,
      null,
      null
    );
    user
      .save()
      .then(() => {
        // Sending email before sending a response
        let data = { email: req.body.email, url: url };
        Helpers.sendmail(data);
        res.status(201).json({ status: "success" });
      })
      .catch((err) => console.log(err));
  } else {
    //     // send error object to react
    res.json(toSend);
  }
};

// creation of a new tokon -> jwt helper

const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

// User login

exports.postLogin = async (req, res, next) => {
  var dataErr = {},
    toSend = {},
    verify;
  //   await User.UserNameModel(req.body.userName).then(([user]) => { user.map(el => {(el.userName === req.body.userName) ? dataErr.validUserNameErr = "Username already exist !" : '' })});

  // we need to stop redirection if user ids not login
  await User.UserNameModel(req.body.userName).then(([el]) => {
    if(el.length != 0)
    {
      // console.log("***", el);
      el.map((el) => {
        if (el.verify === 1)
        verify = true;
        else 
        verify = false;
      });
    }
  });

  await User.UserNameModel(req.body.userName)
    .then(([user]) => {
      if (user.length) {
        user.map((el) => {
          if (Helpers.cmpBcypt(req.body.password, el.password)) {
            if(verify === false)
              dataErr.errorGlobal = "Please Verify Your account from the link we sent you in you mailbox"; 
            else {
              try {
                const token = createtoken(el.id);
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000,
                });
                res.status(201).json({
                  verified: verify,
                  status: "success",
                  user: el.id,
                  token,
                });
              } catch (err) {
                res.status(400).json({});
              }
            }
          } else dataErr.errorGlobal = "Username or Password is incorrect";
        });
      } else dataErr.errorGlobal = "Username or Password is incorrect";
    })
    .catch((err) => console.log(err));
  if (Object.keys(dataErr).length !== 0) {
    toSend = { ...dataErr, ...res.locals.input };
    res.json({ status1: verify, status: "fail", toSend });
  }
};

// snedForget password

exports.sendForget = async (req, res, next) => {
  // Search for email in db
  var dataErr = {},
    tmp = [];
  await User.UserEmailModel(req.body.email).then(([user]) => {
    if (!user.length) dataErr.validEmailErr = "email doesn't exist !";
  });
  tmp.push(dataErr);
  const checkErr = tmp.map((el) => {
    return el["validEmailErr"] === undefined ? 0 : 1;
  });
  // merge error from res.locals from validator controller
  var tmp1 = [];
  tmp1.push(res.locals.input);
  const checkErr1 = tmp1.map((el) => {
    return el["validEmailErr"] === undefined ? 0 : 1;
  });
  // Show the big problem then we will deleete the first error if this is one,
  if (checkErr1.includes(1)) dataErr = { ...res.locals.input };
  // Send a new verification to the user
  if (!checkErr.includes(1)) {
    // need more work ....
    // ....................
    var vkey = Helpers.keyCrypto(req.body.email);
    var url =
      "<a href='http://localhost:3000/forget/" +
      vkey +
      "'>Change your password</a>";
    User.UpdateOldVkey(vkey, req.body.email);
    let data = { email: req.body.email, url: url };
    Helpers.sendmail(data);
    res.json({ status: "success" });
  } else res.json(dataErr);
  // console.log(dataErr);
};

// forget password

exports.forgetPassword = async (req, res, next) => {
  var dataErr = {};
  var psText;
  await User.vkeyGetUser(req.params.vkey).then(([user]) => {
    user.map((el) => (psText = el.password));
  });
  dataErr.msg = res.locals.input.validCnfpErr;
  dataErr.msg = res.locals.input.validNewpErr;
  dataErr.status = "fail";
  // cotroller validator take care of error
  User.vkeyValidate(req.params.vkey)
    .then(([user]) => {
      let vkey = user.map((el) => {
        return el.vkey;
      });
      if (vkey.length) {
        if (req.body.newPassword === req.body.cnfrmPassword) {
          if (!Helpers.cmpBcypt(req.body.newPassword, psText)) {
            User.UserForgetPassword(
              Helpers.keyBcypt(req.body.newPassword),
              vkey
            ).then((dataErr.status = "success"));
          } else dataErr.msg = "Password already exists.";
        } else dataErr.msg = "Confirm Your password.";
      } else dataErr.msg = "Something wrong, please check your email.";
      res.json(dataErr);
    })
    .catch((err) => console.log(err));
};

// validate user profil

exports.confirmUser = (req, res, next) => {
  var data = {};
  User.validateUser(req.params.vkey)
    .then(([vKey]) => {
      if (vKey.changedRows === 1) {
        data.status = "succes";
        data.msg = "You can login now !";
        data.url = "/Login";
      } else if (vKey.affectedRows === 1) {
        data.status = "verify";
        data.msg = "Already verify";
        data.url = "/Login";
      } else {
        data.status = "fail";
        data.msg = "You have been enable to verify your account";
        data.url = "/sendNewEmail";
      }
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.logout = (req, res) => {
  // res.cookie('jwt', '', { maxAge: 1});
  res.clearCookie("jwt");
  res.json({ status: "Success" });
};

exports.checkLogin = (req, res) => {
  res.send(req.cookies);
};

//oauth


exports.google = (req, res, next) => {
  console.log('GOOGLE')
  passport.authenticate('google', {  prompt: 'select_account', session : false, scope : ['profile', 'email']})
  (req, res, next)
};

exports.googleCallback = (req, res, next) => {
  token = createtoken(req.session.passport.user.sub);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.redirect('http://localhost:3000/Login');
  (req, res, next)
};
// facebook
exports.facebook = (req, res, next) => {
  console.log('FACEBOOK')
  passport.authenticate('facebook', { authType: 'reauthenticate', session : false, scope: ['email']})
  (req, res, next)
};

exports.facebookCallback = (req, res, next) => {
  token = createtoken(req.session.passport.user.id);   
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.redirect('http://localhost:3000/Login');
  (req, res, next)
};

// 42

exports.intra = (req, res, next) => {
  console.log('42')
  passport.authenticate('42')
  (req, res, next)
};

exports.intraCallback = (req, res, next) => {
  token = createtoken(req.session.passport.user.id);   
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.redirect('http://localhost:3000/Login');
  (req, res, next)
};

// Controller to check if The user Filled all the required personal Informations

exports.userInfoVerification = async (req, res) => {
  var id = req.body.userId;
  await User.CheckRequiredUserInfo(id).then((response) => {
    if(response[0] != undefined && response[0].length != 0)
      res.json({status: true});
    else 
      res.json({status: false});
  })
  .catch(err => console.log('checkReuired..Error', err));
};

// get Avatar

exports.Avatar = async (req, res) => {
  // res.json({test : req.body.userId})
  var userId = req.body.userId;
  await User.Avatar(userId).then((response) => {
    if(response[0][0])
    {
      var obj = response[0][0];
      res.json({image : obj.image})
    }
  }).catch((err) => console.log(err));
}