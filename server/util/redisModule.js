const redis = require('redis');
const bluebird = require("bluebird")
bluebird.promisifyAll(redis)
const client = redis.createClient({});

module.exports = {client, redis}