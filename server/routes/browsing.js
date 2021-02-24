const Browsing = require('../controllers/browsing')

const express = require('express')
const route = express.Router()

// localistatiuon

route.post('/browsing/geo/:id', Browsing.geoOneUser)

// get all users with ◦ Same geographic area as the user. ◦ With a maximum of common tags.◦ With a maximum “fame rating

route.post('/browsing/:id', Browsing.index)

// likes

route.post('/browsing/likes/:id', Browsing.likes)

// deslike

route.post('/browsing/deslike/:id', Browsing.deLikes)

// history

route.post('/browsing/history/:id', Browsing.history)

// getHsitory

route.post('/browsing/getHistory/:id', Browsing.getHsitory)

// fetch all images

route.post('/browsing/fetchAllImg/:id', Browsing.allImg)

// search for users

route.post('/browsing/search/:id', Browsing.search)

module.exports = route