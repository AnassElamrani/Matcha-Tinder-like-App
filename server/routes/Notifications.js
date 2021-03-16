const NotificationsController = require("../controllers/Notfications");

// const {client , redis } = require('../util/redisModule');

const express = require("express");
const route = express.Router();

route.post('/saveNotifications', NotificationsController.saveNotifications);

route.post('/getUserNotifs', NotificationsController.getUserNotifs);

route.post('/doILikeHim', NotificationsController.doILikeHim);

route.post('/isMatched', NotificationsController.isMatched);

module.exports = route;