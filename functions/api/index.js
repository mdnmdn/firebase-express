'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const db = require('../firebase').database;

console.log(db);

exports.checkInitSurvey = (() => {
    var _ref = _asyncToGenerator(function* (instance = 'default') {
        const data = yield db.ref(`/data/${instance}/surveys`).once('value');
        if (!data) {
            console.log(`creating repo ${instance}`);
            const orginalData = yield db.ref(`/data/__template`).once('value');
            yield db.ref(`/data/${instance}`).set(orginalData);
        }
    });

    return function () {
        return _ref.apply(this, arguments);
    };
})();

exports.list = (() => {
    var _ref2 = _asyncToGenerator(function* ({
        instance, search, active
    }) {
        const data = yield db.ref(`/data/${instance}/surveys`).once('value');
        return data;
    });

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
})();
//# sourceMappingURL=index.js.map