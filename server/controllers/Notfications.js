const Notif = require('../models/Notifications');
const { response } = require('express');


exports.saveNotifications = async (req, res) => {
    if(req.body.who && req.body.target && req.body.type)
    {
        await Notif.saveNotification(req.body.type, req.body.who, req.body.target)
        .then((response) => {
            // console.log('1212', response);
            if(response[0].affectedRows)
            {
                console.log('true')
                res.json({st : true});
            }
            else {
                onsole.log('false')
                res.json({status : false})
            }
        }).catch((err) => {
            console.log('errNotif', err);
        })
    } else {
        console.log('false2')
        res.json({status : false})
    }
}

exports.getUserNotifs = async (req, res) => {
    if(req.body.userId)
    {
        console.log('3245734526745764552345')
        await Notif.getUserNotifs(req.body.userId)
        .then(response => {
            if(response)
            {
                if(response[0])
                    res.json({whoInfos : response[0]})
                else {
                    console.log('RES', response);
                }
            }
        }).catch((err) => console.log('Usernotif', err));

    }
}

exports.doILikeHim = async (req, res) => {
    if(req.body.myId && req.body.hisId)
    {
        console.log('ZzzzZZ3220');
        await Notif.doILikeHim(req.body.myId, req.body.hisId)
        .then((response) => {
            // console.log('response', response);
            if(response[0].length != 0)
                res.json({answer: "yes", resp: response});
            else if(response[0].length === 0)
                res.json({answer: "no"});
        })
    }
    else {
        res.json({status:false, answer:"erro"});
    }
}

exports.isMatched = async (req, res) => {
    if(req.body.myId && req.body.hisId)
    {
        console.log('ppppp3220');
        await Notif.isMatched(req.body.myId, req.body.hisId)
        .then((response) => {
            // console.log('response', response);
            if(response[0].length != 0)
                res.json({answer: "yes"});
            else if(response[0].length === 0)
                res.json({answer: "no"});
        })
    }
    else {
        res.json({status:false, answer:"erro"});
    }
}