const express = require('express');
const api = require('../api');

const router = express.Router();

const list = async (req, res) => {
  try{
    const result = await api.list({
      instance: req.params.instance,
      search: req.query.search,
      active: req.query.active,
      first: req.query.first || 0,
      count: req.query.count || 20,
    });
    
    // fixme: don't use workaround
    result.forEach(element => {
      delete element.questions;
    });
      

    res.send(result);
  }catch(err){
      res.send({error: err.messsage, stackTrace: err.stackTrace});
  }
};

const detail = async (req, res) => {
  try{
    const result = await api.get({
      instance: req.params.instance,
      surveyId: req.params.surveyId
    });
    
    res.send(result);
  }catch(err){
      res.send({error: err.messsage, stackTrace: err.stackTrace});
  }
};

const answers = async (req, res) => {
  try{
    const result = await api.answers({
      instance: req.params.instance,
      surveyId: req.params.surveyId,
      search: req.query.search,
      first: req.query.first || 0,
      count: req.query.count || 20,
    });
    
    // fixme: don't use workaround
    result.forEach(element => {
      delete element.questions;
    });
      
    res.send(result);
  }catch(err){
      res.send({error: err.messsage, stackTrace: err.stackTrace});
  }
};

router.get('/list', list);
router.get('/:instance/list', list);

router.get('/detail/:surveyId', detail);
router.get('/:instance/detail/:surveyId', detail);

router.get('/detail/:surveyId/answers', answers);
router.get('/:instance/detail/:surveyId/answers', answers);


router.get('/', async(req, res)   => {
});

module.exports = router; 