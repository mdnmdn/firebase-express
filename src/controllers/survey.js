const express = require('express');
const api = require('../api');

const router = express.Router();

const list = async (req, res) => {
  try{
  const result = await api.list({});
  res.send(result);
  }catch(err){
      res.send(err)
;  }
};

router.get('/list', list);
router.get('/:istance/list', list);


router.get('/', async(req, res)   => {
});

module.exports = router; 