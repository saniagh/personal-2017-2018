const Settings = require('mongoose').model('Settings');
const express = require('express');

const router = new express.Router();

router.get('/get-settings', (req, res) => {
  Settings.find({}, (err, settings) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else if (settings.length === 0) {
      return res.json({
        hasSettings: false,
      });
    } else return res.json({
      hasSettings: true,
      settings: settings,
    });
  });
});

router.get('/set-default-settings', (req, res) => {
  // ['Currency name', 'Currency symbol']
  const defaultSettingsData = {
    currency: ['RON', 'RON'],
  };

  const newDefaultSettings = new Settings(defaultSettingsData);
  newDefaultSettings.save((err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      settings: defaultSettingsData,
    });
  });
});

router.post('/update-settings', (req, res) => {
  Settings.updateMany({}, {
    $set: { currency: JSON.parse(req.body.currency) },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.get('/update-to-default-settings', (req, res) => {
  Settings.updateMany({}, {
    $set: { currency: ['RON', 'RON'] },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.post('/update-site-navigation', (req, res) => {
  Settings.updateMany({}, {
    $set: {
      siteNavigation: JSON.parse(req.body.siteNavigation),
    },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.post('/update-site-slider', (req, res) => {
  Settings.updateMany({}, {
    $set: {
      sliderImages: JSON.parse(req.body.sliderImages),
    },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.post('/update-top-promotional-banner', (req, res) => {
  Settings.updateMany({}, {
    $set: {
      topPromotionalBanner: JSON.parse(req.body.topPromotionalBanner),
    },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

module.exports = router;
