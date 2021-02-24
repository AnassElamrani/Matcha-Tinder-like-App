const jwt = require('jsonwebtoken');
const User = require('../models/userData');

// CheckAuth require

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err)
                res.json({access:"denied", msg: "Protected Route - You Must Loggin To Access This Route !"})
            else{
                res.json({access:"Granted", jwt: req.cookies.jwt, msg: "User Allowed"})
                next();
            }
        })
    }else
        res.json({access:"denied", msg: "Protected Route - You Must Loggin To Access This Route !"})
}

// Check if user already exist ...

exports.getUserInfos = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }else{
                let user = await User.UserIdModel(decodedToken.id)
                if(user[0].length != 0)
                {
                    let infos = user[0][0]
                    if(infos.length != 0)
                        res.json({user: infos})
                }
                else    // res.locals.user = infos
                {
                    let oUser = await User.UserAuthIdModel(decodedToken.id)
                    let oInfos = oUser[0][0]
                    if(oInfos.length != 0)
                        res.json({user: oInfos})
                }
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}