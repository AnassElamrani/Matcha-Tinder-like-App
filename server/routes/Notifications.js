const NotificationsController = require("../controllers/Notfications");

// const {client , redis } = require('../util/redisModule');

const express = require("express");
const route = express.Router();

route.post('/saveNotifications', NotificationsController.saveNotifications);

route.post('/getUserNotifs', NotificationsController.getUserNotifs);


module.exports = route;