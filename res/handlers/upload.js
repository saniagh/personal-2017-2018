const Uploads = require('mongoose').model('Uploads');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid');

const router = new express.Router();

const authValidation = require(
    '../middleware/auth-validation.js',
);

// once we implement users we should use the user id to change the filename

let uniqueName;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },

  filename: function (req, file, callback) {
    const random = Math.random();
    uniqueName = uuid.v4() + file.originalname;
    callback(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 255,
    fileSize: 20000000,
  },
}).single('upload-file');

router.post('/upload', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  upload(req, res, function (err) {
    if (err) {
      res.status(400).send('File size is too large/Unexpected error');
    }

    const uploadDetails = {
      displayName: req.file.originalname,
      uniqueName: uniqueName,
      url: '/uploads/' + uniqueName,
    };

    const newUpload = new Uploads(uploadDetails);
    newUpload.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
        });
      }

      return res.json({
        success: true,
      });
    });
  });
});

router.get('/getAllUploads', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Uploads.find({}, (err, uploads) => {
    if (err) {
      return res.status(400).json({
        message: 'Fetching error',
      });
    } else if (!uploads) {
      return res.status(404).json({
        message: 'No records found',
      });
    } else return res.json({
      uploads: uploads,
    });
  }).sort({ createdAt: -1 });
});

router.post('/changeImageDisplayName', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Uploads.updateOne({ url: req.body.selectedUrl }, {
    $set: {
      displayName: req.body.selectedDisplayName,
    },
  }, (err, image) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred',
      });
    } else if (!image) {
      return res.status(404).json({
        message: 'No record found',
      });
    } else return res.json({
      success: true,
    });
  });
});

module.exports = router;
