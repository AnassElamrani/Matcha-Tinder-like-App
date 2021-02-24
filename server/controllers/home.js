const User = require("../models/userData");
const Tag = require('../models/tagData')
const Img = require('../models/imgData')
const Geo = require('../models/geoData')
const Helpers = require("../util/Helpers");
const fs = require("fs");
const path = require("path");

// edit information if user want that

exports.edit = async (req, res, next) => {
  var data = {},
    toSend = {};
  toSend.input = { ...res.locals.input };
  data = { ...req.body };
  data.id = req.params.id;

  if (Object.keys(toSend.input).length !== 0) res.json(toSend);
  else {
    await User.UpdateFirstInfo(data).then(([res]) => {
      if (res.affectedRows === 1) {
        toSend.status = true;
      } else toSend.status = false;
    });
    res.json(toSend);
  }
};

// edit password

exports.editPassword = (req, res) => {
  var dataErr = {};
  dataErr.input = { ...res.locals.input };
  res.locals.user[0].map(async (el) => {
    var id = el.id,
      oldP = req.body.password,
      newP = req.body.newPassword,
      cnfP = req.body.cnfrmPassword,
      psText;
    try {
      await User.UserIdModel(id).then(([user]) => {
        user.map((el) => (psText = el.password));
      });
      if (Helpers.cmpBcypt(oldP, psText)) {
        if (newP === cnfP) {
          if (!Helpers.cmpBcypt(newP, psText)) {
            User.UserForgetPassword_(Helpers.keyBcypt(newP), id).then(
              (dataErr.msg = "Password Changed.")
            );
          } else dataErr.msg = "Enter a new password";
        } else dataErr.msg = "Confirm Your password";
      } else dataErr.msg = "Enter your old password";
      res.json(dataErr);
    } catch (error) {
      console.log(error);
    }
  });
};

// edit profil

exports.editProfil = (req, res) => {
  var dataErr = {},
    data = {},
    toSend = {}
  toSend.input = { ...res.locals.input }
  data = { ...req.body }
  data.id = req.params.id
  dataErr.status = false

  if (Object.keys(toSend.input).length !== 0) res.json(toSend)
  else{
    User.UpdateProfilInfo(data);
    dataErr.status = true
    res.json(dataErr);
  }
};

// Fill profil with help of id just for test

exports.fillProfil = async (req, res, next) => {
  var dataErr = {},
    data = {},
    toSend = {};
  toSend.input = { ...res.locals.input }
  data = { ...req.body }
  data.id = req.params.id
  
  if (Object.keys(toSend.input).length !== 0) res.json(toSend)
  else{
    try {
      await User.UserIdModel(data.id).then(([user]) => {
        if (user.length) {
          User.fillProfilUpdate(data).then(([UpRes]) => {
            if (UpRes.affectedRows) dataErr.status = true
            else dataErr.msg = 'Nothing changed'
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
    data.tag.map((el) => {
      Tag.tagExists(el.name).then(([tagRes]) => {
        if (!tagRes.length) {
          const tag = new Tag(null, el.name)
          tag.save().then(() => {
            Tag.tagExists(el.name).then((res) => {
              res[0].map((id) => {
                Tag.insertInTagUser(data.id, id.id)
              })
            })
          })
        } else {
          Tag.tagIdModel(data.id, el.name).then(([userTag]) => {
            if (!userTag.length) {
              Tag.tagExists(el.name).then((res) => {
                res[0].map((id) => {
                  Tag.insertInTagUser(data.id, id.id)
                })
              })
            }
          })
          dataErr.msgTag = 'Already exists'
        }
      })
    })
    res.json({dataErr, status: true})
  }
};

// change status done

exports.changeStatus = async (req, res) => {
  const { id } = req.params
  await User.CheckRequiredUserInfo(id)
  .then((response) => {
    if (response[0] != undefined && response[0].length != 0){
      // update status 2
      User.UpdateStatusUser(id)
      res.json({ status: true })
    }
    else res.json({ status: false })
  })
  .catch((err) => console.log('checkReuired..Error', err))
}

exports.tags = async (req, res) => {
  var data = {};
  await Tag.getAllTag(req.params.id).then(([res]) => {
    data = res.map((el, iKey) => {
      return { key: iKey, name: el.name };
    });
  });
  res.json(data);
};

exports.allTags = async (req, res, next) => {
  var data = {}
  await Tag.cmpIdTag(req.params.id).then(([res]) => {
    data = res.map((el, iKey) => {
      return { key: iKey, name: el.name }
    })
  })
  res.json(data)
}

exports.getImges = (req, res) => {
  const uploadDerictory = path.join("public/upload");
  console.log(uploadDerictory);
  fs.readdir(uploadDerictory, (err, files) => {
    console.log(files);
    if (err) {
      res.json({ msg: err });
      //   console.log(err)
    } else if (files.length === 0) {
      res.json({ msg: "No Images uploaded" });
    }
    return res.json({ files });
    // console.log(file)
  });
};

// check for edit profil

exports.checkIs = (req, res) => {
  User.CheckIfE(req.params.id).then(([is]) => {
    if (is.length) {
      res.json({ status: true })
    }else
      res.json({ status: false })
  })
}

// check for stepper

exports.checkIs1 = (req, res) => {
  User.CheckIfE(req.params.id).then(([is]) => {
    if (!is.length) {
      res.json({ status: true })
    }else
      res.json({ status: false })
  })
}

exports.geo = (req, res) => {
  var data = {},
    data = { ...req.body }
  data.id = req.params.id
  let word

  Geo.checkLocIs(data.id).then(([res]) => {
    if (!res.length){
      Helpers.geoLocal(data.lat, data.long).then(city => {
        city.map(el => {
          word = el.city.split(' ')
          const geo = new Geo(null, data.id, word[0], data.lat, data.long)
          geo.save();
        })
      })
    }
  })
}

// update locallisation

exports.updateLoc = async (req, res) => {
  // call Geo.updateGeo
  var data = {},
    data = { ...req.body }
  data.id = req.params.id

  await Helpers.geoLocal(data.latlng.lat, data.latlng.lng).then(city => {
    city.map(el => {
      if (el.city !== undefined){
        word = el.city.split(' ')
        data.city = word[0]
        Geo.updateGeo(data)
      }
    })
  }).catch(() => Geo.updateLatlng(data));

  res.json(data.city)
  // console.log(data)
  // await Geo.updateGeo(data).then(city => {
  //   res.json({status: true})
  // })
}

exports.multerUpload = (req, res, next) => {
  Helpers.upload(req, res, (err) => {
    const go = async () => {
      const data = {};
      if(err){
        data.msg = "Error Has Occured";
        data.errors = err;
      } else {
        if(req.file == undefined){
          data.msg = "No File Selected!"
          data.errors = "";
        } else {
          data.msg = "File Uploaded!"
          data.errors = "";
          data.index = req.body.index;
          checkIm = await Img.checkImg(req.body.userId, req.body.index);
          if(checkIm[0].length == 0)
          {
            image = new Img(null, req.body.userId, req.file.filename, req.body.index)
            await image.save()
          } else
            await Img.updateImg(req.body.userId, req.file.filename, req.body.index);
        }
      }
      data.userId = req.body.userId
      res.json({data: data})
      res.locals.data = data;
      next();
    }
    go();
  })
}


exports.dnd = async (req, res, next) => {
  console.log('-')
  console.log('dnd', req.body)
  res.json({ops :'DnD'});
  var changeIndex = await Img.updateImgPointer(req.body.index, req.body.id)
}

// get number of images saved in db

exports.fetchImgs  = async (req, res, next) => {
  const total = await Img.ImgsTotalNumber(req.body.userId);
  res.json({s:total[0].length})
}

// delete all stepper part

exports.dltImg = async (req, res, next) => {
  const { id } = req.params
  Img.selectImg(id).then(([res]) => {
    res.map((el) => {
      const uploadDerictory = path.join('public/upload')
      var fs = require('fs')
      var filePath = uploadDerictory + '/' + el.image
      fs.unlinkSync(filePath)
    })
  })
  await Img.DeleteImages(id)
  await User.DeleteProfilInfo(id)
  await Tag.DeleteTags(id)
  res.json({ status: true })
}

// delete just the images stepper part

exports.onlyImg = async (req, res, next) => {
  const { id } = req.params
  Img.selectImg(id).then(([res]) => {
    res.map((el) => {
      const uploadDerictory = path.join('public/upload')
      var fs = require('fs')
      var filePath = uploadDerictory + '/' + el.image
      fs.unlinkSync(filePath)
    })
  })
  await Img.DeleteImages(id)
  res.json({ status: true })
}