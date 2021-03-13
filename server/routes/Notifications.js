const NotificationsController = require("../controllers/chat");

// const {client , redis } = require('../util/redisModule');

const express = require("express");
const route = express.Router();

route.post('/saveNotifiction', NotificationsController.saveNotifiction);


module.exports = route;