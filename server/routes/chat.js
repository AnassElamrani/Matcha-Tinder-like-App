const chatController = require("../controllers/chat");
// const validator = require("../controllers/validator");
// const authVrfy = require("../middleware/autMiddleware");
// const Helpers = require("../util/Helpers");

const express = require("express");
const route = express.Router();

route.post('/people', chatController.people)

module.exports = route;