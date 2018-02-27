'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const api = require('../api');

const router = express.Router();

const list = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const result = yield api.list({
        instance: req.params.instance,
        search: req.query.search,
        active: req.query.active,
        first: req.query.first || 0,
        count: req.query.count || 20
      });

      // fixme: don't use workaround
      result.forEach(function (element) {
        delete element.questions;
      });

      res.send(result);
    } catch (err) {
      res.send({ error: err.messsage, stackTrace: err.stackTrace });
    }
  });

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const detail = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const result = yield api.get({
        instance: req.params.instance,
        surveyId: req.params.surveyId
      });

      res.send(result);
    } catch (err) {
      res.send({ error: err.messsage, stackTrace: err.stackTrace });
    }
  });

  return function detail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const answers = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      const result = yield api.answers({
        instance: req.params.instance,
        surveyId: req.params.surveyId,
        search: req.query.search,
        first: req.query.first || 0,
        count: req.query.count || 20
      });

      // fixme: don't use workaround
      result.forEach(function (element) {
        delete element.questions;
      });

      res.send(result);
    } catch (err) {
      res.send({ error: err.messsage, stackTrace: err.stackTrace });
    }
  });

  return function answers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

router.get('/list', list);
router.get('/:instance/list', list);

router.get('/detail/:surveyId', detail);
router.get('/:instance/detail/:surveyId', detail);

router.get('/detail/:surveyId/answers', answers);
router.get('/:instance/detail/:surveyId/answers', answers);

router.get('/', (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {});

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})());

module.exports = router;
//# sourceMappingURL=survey.js.map