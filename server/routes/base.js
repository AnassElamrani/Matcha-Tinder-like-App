const homeController = require("../controllers/home");
const validator = require("../controllers/validator");
const authVrfy = require("../middleware/autMiddleware");
// const Helpers = require("../util/Helpers");

const express = require("express");
const route = express.Router();

// Get home [page]

route.get("/base", authVrfy.getUserInfos);

//continue with this part

route.post(
  "/base/edit/:id",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.edit
);

//  edit password logged POST

route.post(
  "/base/editpassword/",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.editPassword
);

//  edit profil logged POST

route.post(
  "/base/editprofil/:id",
  validator.validationInput,
  homeController.editProfil
);

// post fill profil

route.post(
  "/base/profil/:id",
  validator.validationInput,
  homeController.fillProfil
);

// status profil

route.post('/base/status/:id', homeController.changeStatus)

// add img

route.post('/base/img/:id', homeController.multerUpload)

route.post('/base/img/dnd/:id', homeController.dnd)

route.post('/base/img/fetch/:id', homeController.fetchImgs)

route.post('/base/dltImg/:id', homeController.dltImg)

route.post('/base/onlyImg/:id', homeController.onlyImg)

// ??

route.post('/base/tag/:id', homeController.tags)

// get all tags [POST]

route.post('/base/alltag/:id', homeController.allTags)

// get all images

route.get("/upload/:filename", homeController.getImges)

// check if profil is complet

route.post('/base/check/:id', homeController.checkIs)

// check if stepper not null

route.post('/base/check1/:id', homeController.checkIs1)

// localistation

route.post('/base/localisation/:id', homeController.geo)

// Update localistion

route.post('/base/updateGeo/:id', homeController.updateLoc)

module.exports = route;