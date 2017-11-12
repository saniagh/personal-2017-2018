const express = require('express');
const multer = require('multer');

const router = new express.Router();

// once we implement users we should use the user id to change the filename

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },

  filename: function (req, file, callback) {
    const dateNow = Date.now();
    const multiplier = Math.random();
    const randomCode = Math.ceil(dateNow * multiplier);
    callback(null, randomCode + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 255,
    fileSize: 10000000,
  },
}).single('upload-file');

router.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).send('File size is too large/Unexpected error');
    }

    res.end('File has been uploaded');
  });
});

module.exports = router;
