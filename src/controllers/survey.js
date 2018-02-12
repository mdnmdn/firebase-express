const express = require('express');
const api = require('../api');

const router = express.Router();

const list = async (req, res) => {
  try{
  const result = await api.list({
    instance: req.instance,
    search: req.query.search,
    active: req.query.active,
    first: req.query.first || 0,
    count: req.query.count || 20,
  });
    res.send(result);
  }catch(err){
      res.send({error: err.messsage, stackTrace: err.stackTrace});
  }
};

router.get('/list', list);
router.get('/:istance/list', list);


router.get('/', async(req, res)   => {
});

module.exports = router; 