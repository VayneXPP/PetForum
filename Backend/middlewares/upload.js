// upload.js
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/Projects/PetForum/Backend/postImages')
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

module.exports = upload;