'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('home');
});

router.get('/info', (req, res) => {
  res.send('info');
});

module.exports = router;
//# sourceMappingURL=home.js.map