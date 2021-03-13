const Notif = require('../models/Notifications');
const { response } = require('express');


exports.saveNotifications = async (res, res) => {
    if(req.body.who && req.body.target && req.body.type)
    {
        await Notif.saveNotification(req.body.who, req.body.target)
        .then((res) => {
            console.log('1212', res[0]);
            res.json(true);
        })
    } else {
        res.json(false)
    }
}