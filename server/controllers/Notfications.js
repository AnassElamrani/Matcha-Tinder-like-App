const Notif = require('../models/Notifications');
const { response } = require('express');


exports.saveNotifications = async (req, res) => {
    if(req.body.who && req.body.target && req.body.type && req.bodytype)
    {
        await Notif.saveNotification(req.body.who, req.body.target, req.body.type)
        .then((res) => {
            console.log('1212', res);
            res.json(true);
        })
    } else {
        res.json(false)
    }
}