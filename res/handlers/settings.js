const Settings = require('mongoose').model('Settings');
const express = require('express');

const router = new express.Router();

const authValidation = require(
    '../middleware/auth-validation.js',
);

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
    siteNavigation: [],
    sliderImages: [],
    topPromotionalBanner: {},
    leftIndexPromotionsDesktop: {},
    rightIndexPromotionsDesktop: {},
    footerIndexPromotionsDesktop: {},
    indexPromotionsNewArrivals: [],
    indexSalesTopPosterDesktop: {},
    indexSalesMiddleImagesDesktop: [],
    indexSalesMiddlePosterDesktop: {},
    indexSalesBottomImagesDesktop: [],
    indexImagesMobile: [],
    footerLeftColumn: [],
    footerCenterColumn: [],
    footerRightColumn: [],
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

router.post('/update-settings', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

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

router.get('/update-to-default-settings', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

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

router.post('/update-site-navigation', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

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

router.post('/update-site-slider', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

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

router.post('/update-top-promotional-banner', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

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

router.post('/update-index-images-desktop', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Settings.updateMany({}, {
        $set: {
          leftIndexPromotionsDesktop: JSON.parse(
              req.body.leftIndexPromotionsDesktop),
          rightIndexPromotionsDesktop: JSON.parse(
              req.body.rightIndexPromotionsDesktop),
          footerIndexPromotionsDesktop: JSON.parse(
              req.body.footerIndexPromotionsDesktop),
          indexPromotionsNewArrivals: JSON.parse(
              req.body.indexPromotionsNewArrivals),
          indexSalesTopPosterDesktop: JSON.parse(
              req.body.indexSalesTopPosterDesktop),
          indexSalesMiddleImagesDesktop: JSON.parse(
              req.body.indexSalesMiddleImagesDesktop),
          indexSalesMiddlePosterDesktop: JSON.parse(
              req.body.indexSalesMiddlePosterDesktop),
          indexSalesBottomImagesDesktop: JSON.parse(
              req.body.indexSalesBottomImagesDesktop),
        },
      }, (err) => {
        if (err) {
          return res.status(400).json({
            message: 'An error has occurred.',
          });
        } else return res.json({
          success: true,
        });
      },
  );
});

router.post('/update-index-images-mobile', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Settings.updateMany({}, {
        $set: {
          indexImagesMobile: JSON.parse(req.body.indexImagesMobile),
        },
      }, (err) => {
        if (err) {
          return res.status(400).json({
            message: 'An error has occurred.',
          });
        } else return res.json({
          success: true,
        });
      },
  );
});

router.post('/update-footer', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Settings.updateMany({}, {
    $set: {
      footerLeftColumn: JSON.parse(req.body.footerLeftColumn),
      footerCenterColumn: JSON.parse(req.body.footerCenterColumn),
      footerRightColumn: JSON.parse(req.body.footerRightColumn),
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
