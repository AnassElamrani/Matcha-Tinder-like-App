const Notif = require('../models/Notifications');
const { response } = require('express');


exports.saveNotifications = async (req, res) => {
    if(req.body.who && req.body.target && req.body.type)
    {
        await Notif.saveNotification(req.body.type, req.body.who, req.body.target)
        .then((response) => {
            // console.log('1212', response);
            if(response[0].affectedRows)
            res.json({st : true});
            else 
            res.json({status : false})
        }).catch((err) => {
            console.log('errNotif', err);
        })
    } else {
        res.json({status : false})
    }
}

exports.getUserNotifs = async (req, res) => {
    if(req.body.userId)
    {
        console.log('3245734526745764552345')
        await Notif.getUserNotifs(req.body.userId)
        .then(res => {
            if(res)
            {
                if(res[0])
                    res.json({whoInfos : res[0]})
                else {
                    console.log('RES', res);
                }
            }
        }).catch((err) => console.log('Usernotif', err));

    }
}