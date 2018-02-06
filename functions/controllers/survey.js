'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const api = require('../api');

const router = express.Router();

const list = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const result = yield api.list({});
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

router.get('/list', list);
router.get('/:istance/list', list);

router.get('/', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {});

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

module.exports = router;
//# sourceMappingURL=survey.js.map