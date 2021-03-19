const path = require('path')
const Geo = require('../models/geoData')
const Like = require('../models/likeData')
const Img = require('../models/imgData')
const History = require('../models/historyData')
const Report = require('../models/reportData')
const Block = require('../models/blockData')

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
  if (isNaN(id))
    res.json(false)
  else{
    if (cord !== undefined && gender !== undefined) {
      await Geo.getAll(cord, gender, id)
        .then(([res]) => {
          res.map((el) => {
            data.push(el)
          })
        })
        .catch((err) => console.log(err))
      res.json(data)
    } else res.json(false)
  }
}

exports.likes = async (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.idLiker = req.params.id
  if (data.idLiker !== undefined && data.idLiked !== undefined) {
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
        // update fame rating with 6
        Like.fameRatingForLike(data.idLiker, 6)
        Like.fameRatingForLike(data.idLiked, 6)
      }
    })

    if (Object.keys(dataErr).length === 0) {
      const like = new Like(null, data.idLiker, data.idLiked)
      like.save()
      // update fame rating with 1
      Like.fameRatingForLike(data.idLiker, 1)
      // check if two users matchw
      res.json({ status: true })
    } else res.json(dataErr)
  } else res.json(false)
}

exports.deLikes = (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.idLiker = req.params.id

  if (data.idLiker !== undefined && data.idLiked !== undefined) {
    Like.addToTableBlocked(data)

    res.json({ status: true })
  } else res.json(false)
}

exports.history = async (req, res, next) => {
  var data = {},
    dataErr = {}
  data = { ...req.body }
  data.visited = req.params.id
  if (isNaN(req.params.id))
    res.json(false)
  else{
    if (data.visitor !== undefined && data.visited !== undefined) {
      await History.checkIfVisited(data).then(([history]) => {
        history.map((el) => {
          if (!el.lenght) {
            dataErr.historyErr = 'Already visited'
            // update created_at in db
            History.updateHistoryDate(data)
          }
        })
      })
  
      if (Object.keys(dataErr).length === 0) {
        const history = new History(null, data.visitor, data.visited)
        history.save()
        }
      res.json({ status: true })
    } else res.json(false)
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
  
  if (!data.length) {
    await Geo.searchUsers(cord, gender, id, value, rating, geo, tag)
      .then(([res]) => {
        res.map((el) => {
          data.push(el)
        })
      })
      .catch((err) => console.log(err))
    res.json(data)
  }else
    res.json(false)

}


exports.report = (req, res, next) => {
  const {reported, feelback} = req.body
  const {id} = req.params

  Report.alreadyReported(id, reported).then(([report]) => {
    if (!report.length){
      const report = new Report(null, id, reported, feelback)
      report.save()
      Like.fameRatingForLike(id, -2)
      Like.fameRatingForLike(reported, -4)  
      res.json({status: true})
    }else
      res.json({status: false})
  })
}

exports.block = (req, res, next) => {
  var data = {}
  const {blocked} = req.body
  data.id = req.params.id
  data.user2 = blocked

  Block.alreadyBlocked(data.id, data.user2).then(async ([block]) => {
    if (!block.length) {
      const block = new Block(null, data.id, blocked)
      await block.save().then(() => {
        Like.fameRatingForLike(data.id, -2)
        Like.fameRatingForLike(data.user2, -4)
        Like.deleteLikes(data)
        Like.deleteMatchs(data)
      })
      res.json({ status: true })
    } else res.json({ status: false })
  })
}


exports.allProfil = async (req, res, next) => {
  const { cord, gender } = req.body
  const { id } = req.params
  var data = []
  if (!data.length) {
    await Geo.allProfilData(cord, gender, id)
      .then(([res]) => {
        res.map((el) => {
          data.push(el)
        })
      })
      .catch((err) => console.log(err))
    res.json(data)
  } else res.json(false)
}

exports.unlike = async (req, res, next) => {
  var data = {},
  data = { ...req.body }
  data.id = req.params.id

  Like.fameRatingForLike(data.id, -2)
  Like.fameRatingForLike(data.user2, -4)
  Like.deleteLikes(data)
  Like.deleteMatchs(data)
  res.json({ status: true })
}