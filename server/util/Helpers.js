const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");
const multer = require("multer");
const { nanoid } = require('nanoid')
const nodeGeocoder = require('node-geocoder')

// helper to  bcrypt password

exports.keyBcypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// helper to compare password already exsist

exports.cmpBcypt = (password, password1) => {
  const cmp = bcrypt.compareSync(password, password1);
  return cmp;
};

// helper to send dynamic email.

exports.sendmail = (data) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hassanseffiani@gmail.com", //replace with your email
      pass: "Exact666ringer-&-", //replace with your password
    },
  });

  var mailOptions = {
    from: "hassanseffiani@gmail.com", // sender address
    to: data["email"],
    subject: "Hello ✔",
    text: "Active your account",
    html: data["url"],
  };

  transporter.sendMail(mailOptions);
};

// Create a key for validation

exports.keyCrypto = (text) => {
  const crypto = require("crypto");
  const secret = "thisissecret";
  const algorithm = "sha256";
  const hash = crypto.createHmac(algorithm, secret).update(text).digest("hex");
  return hash;
};

// upload images

const storage = multer.diskStorage({
  destination: 'public/upload',
  filename: (req, file, cb) => {
    cb(
      null,
      nanoid() +
        file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    )
  },
})


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/gif'
  ) {
    cb(null, true)
  } else {
    // cb(null, false)
    cb('Error: Images Only')
  }
}
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5000000 },
}).single('file')


exports.geoLocal = async (lat, long) => {
  var data = {};
  const options = {
    provider: 'openstreetmap',
  }
  const geoCoder = nodeGeocoder(options)
  await geoCoder.reverse({ lat: lat, lon: long }).then((res) => data = res)
  return data;
}