const Helpers = require('../util/Helpers')
const path = require('path')
const Geo = require('../models/geoData')
const Like = require('../models/likeData')
const Img = require('../models/imgData')
const History = require('../models/historyData')

exports.geoOneUser = (req, res) => {
  // get location about with users id
  const { id } = req.params
  Geo.getLatLong(id).then(([loc]) => {
    loc.map((el) => {
      res.json({ geo: [el.lat, el.long], type: el.type })
    })
  })
}

exports.index = async (req, res, next) => {
  const { cord, gender } = req.body
  const { id } = req.params
  var data = []
  /// iiner table users with location set where in search step < 1 km
  await Geo.getAll(cord, gender, id)
    .then(([res]) => {
      res.map((el) => {
        data.push(el)
      })
      //     data.sort((a, b) => a.cmp - b.cmp);
    })
    .catch((err) => console.log(err))
  // console.log(data)
  res.json(data)
}

exports.likes = async (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.idLiker = req.params.id

  await Like.checkIfLiked(data).then(([like]) => {
    like.map((el) => {
      !el.lenght ? (dataErr.likeErr = 'Already liked') : ''
    })
  })
  // if the user is alr
  await Like.checkIfUserisLiked(data).then(([isLike]) => {
    if (Object.keys(isLike).length !== 0) {
      // add this user to table match
      Like.addToTableMatch(data)
    }
  })

  if (Object.keys(dataErr).length === 0) {
    const like = new Like(null, data.idLiker, data.idLiked)
    like.save()
    // check if two users match
    res.json({ status: true })
  } else res.json(dataErr)
}

exports.deLikes = (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.idLiker = req.params.id

  Like.addToTableBlocked(data)

  res.json({ status: true })
}

exports.history = async (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.visited = req.params.id
  await History.checkIfVisited(data).then(([history]) => {
    history.map((el) => {
      !el.lenght ? (dataErr.historyErr = 'Already visited') : ''
    })
  })

  if (Object.keys(dataErr).length === 0) {
    const history = new History(null, data.visitor, data.visited)
    history.save()
  }
}

exports.getHsitory = async (req, res, next) => {
  const { id } = req.params
  var data = []
  await History.getHistoryData(id).then(([res]) => {
    res.map((el) => {
      data.push(el)
    })
  })

  res.json(data)
}

exports.allImg = async (req, res, next) => {
  var data = {}, images = [], base64 = []
  data.id = req.params.id
  var fs = require('fs')
  const uploadDerictory = path.join('public/upload')

  await Img.selectImg(data.id).then(([res]) => {
    res.map((el) => {
      images.push(uploadDerictory + '/' + el.image)
    })
  })

  images.map(el => {
    base64.push(fs.readFileSync(el, 'base64'))
  })
  res.json(base64)
}

exports.search = async (req, res, next) => {
  const { cord, gender, value, rating, geo, tag } = req.body
  const { id } = req.params
  var data = []

  await Geo.searchUsers(cord, gender, id, value, rating, geo, tag)
    .then(([res]) => {
      res.map((el) => {
        data.push(el)
      })
    })
    .catch((err) => console.log(err))
  res.json(data)
}
