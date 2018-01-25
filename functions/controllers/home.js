const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home'
  });

});

router.get('/info', (req, res) => {
  res.send('info');
});

module.exports = router;