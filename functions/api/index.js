'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const db = require('../firebase').admin.database();

//console.log(db);

exports.checkInitSurvey = (() => {
    var _ref = _asyncToGenerator(function* (instance = 'default') {
        console.log('checkInitSurvey for ' + instance);
        const data = yield db.ref(`/data/${instance}/surveys`).once('value');
        console.log('   => data', data.val());
        if (!data.val()) {
            console.log(`creating repo ${instance}`);
            const orginalData = yield db.ref(`/data/__template`).once('value');
            yield db.ref(`/data/${instance}`).set(orginalData.val());
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
        yield exports.checkInitSurvey(effectiveInstance);
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
                numberOfQuestions: Object.keys(data[k].questions).length,
                questions: data[k].questions
            };
        }).filter(function (survey) {
            return !search ||
            // eslint-disable-next-line eqeqeq
            survey.id == search || `${survey.description}|${survey.name}`.toLowerCase().indexOf(lowerSearch) >= 0;
        }).filter(function (survey) {
            return active === undefined || active === '' ||
            // eslint-disable-next-line eqeqeq
            active == survey.active;
        });
        // pagination
        console.log('slice', first, count, first + count);
        console.log('length1', surveyList.length);
        surveyList = surveyList.slice(first, parseInt(first) + parseInt(count));
        console.log('length2', surveyList.length);
        return surveyList;
    });

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
})();

exports.get = (() => {
    var _ref3 = _asyncToGenerator(function* ({
        instance, surveyId
    }) {
        const effectiveInstance = instance || 'default';
        yield exports.checkInitSurvey(effectiveInstance);
        console.log('get', { instance, surveyId });
        const addr = `/data/${effectiveInstance}/surveys/${surveyId}`;
        const ref = db.ref(addr);
        const result = yield ref.once('value');
        const data = result.val();
        return data;
    });

    return function (_x2) {
        return _ref3.apply(this, arguments);
    };
})();

exports.answers = (() => {
    var _ref4 = _asyncToGenerator(function* ({
        instance, surveyId, search, first = 0, count = 10
    }) {
        const effectiveInstance = instance || 'default';
        yield exports.checkInitSurvey(effectiveInstance);
        console.log('answers', { instance, surveyId, search, effectiveInstance, first, count });
        const addr = `/data/${effectiveInstance}/answers/${surveyId}`;
        const ref = db.ref(addr);
        //return new Promise(r => ref.once('value', val => f(val)));
        const result = yield ref.once('value');
        const data = result.val();
        const lowerSearch = search ? search.toLowerCase() : null;
        let answerList = Object.keys(data).map(function (id) {
            return _extends({ id }, data[id]);
        }).filter(function (answer) {
            return !search ||
            // eslint-disable-next-line eqeqeq
            answer.id == search || answer.name.toLowerCase().indexOf(lowerSearch) >= 0;
        })
        // pagination
        .slice(first, parseInt(first) + parseInt(count));

        return answerList;
    });

    return function (_x3) {
        return _ref4.apply(this, arguments);
    };
})();
//# sourceMappingURL=index.js.map