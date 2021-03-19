const chatController = require("../controllers/chat");
// const validator = require("../controllers/validator");
// const authVrfy = require("../middleware/autMiddleware");
// const Helpers = require("../util/Helpers");
const { client, redis } = require("../util/redisModule");

const express = require("express");
const route = express.Router();

route.post("/people", chatController.people);

// the Room will have connected User Email as name;

route.post("/getConnectedUserInfos", chatController.getUserInfos);

//

// route.post('/redisDeleteId', (req, res) => {
//     const totalofKeysRemoved = client.DEL(req.body.userId);
//     res.json({totalofKeysRemoved: totalofKeysRemoved});
// });

route.post("/saveMessage", chatController.saveMessage);

route.post("/getConversation", chatController.getConversation);

module.exports = route;