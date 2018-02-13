'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const db = require('../firebase').admin.database();

//console.log(db);

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
        instance, search, active, first = 0, count = 10
    }) {
        const effectiveInstance = instance || 'default';
        console.log('list', { instance, search, active, effectiveInstance, first, count });
        const addr = `/data/${effectiveInstance}/surveys`;
        const ref = db.ref(addr);
        //return new Promise(r => ref.once('value', val => f(val)));
        const result = yield ref.once('value');
        const data = result.val();
        const lowerSearch = search ? search.toLowerCase() : null;
        let surveyList = Object.keys(data).map(function (k) {

            return {
                id: data[k].id,
                active: data[k].active,
                name: data[k].name,
                description: data[k].description,
                numberOfQuestions: Object.keys(data[k].questions).length
            };
        }).filter(function (survey) {
            return !search ||
            // eslint-disable-next-line eqeqeq
            survey.id == search || `${survey.description}|${survey.name}`.toLowerCase().indexOf(lowerSearch) >= 0;
        }).filter(function (survey) {
            return active === undefined || active === '' ||
            // eslint-disable-next-line eqeqeq
            active == survey.active;
        })
        // pagination
        .slice(first, first + count);
        return surveyList;
    });

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
})();
//# sourceMappingURL=index.js.map