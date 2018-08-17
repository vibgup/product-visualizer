const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/visualizer/set_type', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/visualizer/set_product', (req, res) => {
  res.render('visualizer/product/index', { title: 'Express' });
});

router.get('/visualizer/viewer', (req, res) => {
  res.render('visualizer/viewer/index', { title: 'Express' });
});

module.exports = router;
