const express = require('express');

const router = express.Router();
const _ = require('lodash');

const MasterConfig = require('../config/index');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// router.get('/visualizer/set_type', (req, res) => {
//   res.render('index', { title: 'Express' });
// });

router.get('/visualizer/viewer', (req, res) => {
  res.render('visualizer/viewer/index', {
    sofasConfig: _.get(MasterConfig, 'sofas', []),
    tablesConfig: _.get(MasterConfig, 'tables', []),
  });
});

module.exports = router;
