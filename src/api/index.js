const db = require('../firebase').admin.database();

//console.log(db);

exports.checkInitSurvey = async (instance = 'default') => {
    console.log('checkInitSurvey for ' + instance);
    const data = await db.ref(`/data/${instance}/surveys`).once('value');
    console.log('   => data',  data.val());
    if (!data.val()){
        console.log(`creating repo ${instance}`);
        const orginalData = await db.ref(`/data/__template`).once('value');
        await db.ref(`/data/${instance}`).set(orginalData.val());
    }
};

exports.list = async ({
    instance, search, active, first = 0, count = 10
    }) => {
        const effectiveInstance = instance || 'default';
        await exports.checkInitSurvey(effectiveInstance);
        console.log('list', {instance, search, active, effectiveInstance, first, count})
        const addr = `/data/${effectiveInstance}/surveys`;
        const ref = db.ref(addr);
        //return new Promise(r => ref.once('value', val => f(val)));
        const result = await ref.once('value');
        const data = result.val();
        const lowerSearch = search ? search.toLowerCase() : null;
        let surveyList = Object.keys(data)
                    .map(k => {
                        
                        return {
                        id: data[k].id,
                        active: data[k].active,
                        name: data[k].name,
                        description: data[k].description,
                        numberOfQuestions: Object.keys(data[k].questions).length,
                        questions: data[k].questions,
                    }})
                    .filter(survey => 
                         !search || 
                        (
                            // eslint-disable-next-line eqeqeq
                            survey.id == search ||
                            `${survey.description}|${survey.name}`.toLowerCase()
                                .indexOf(lowerSearch) >= 0 
                        ))
                    .filter(survey =>
                        active === undefined || 
                        active === '' ||
                        // eslint-disable-next-line eqeqeq
                        active == survey.active);
                    // pagination
        console.log('slice', first, count, first + count);
        console.log('length1', surveyList.length);
        surveyList = surveyList.slice(first, parseInt(first) + parseInt(count));
        console.log('length2', surveyList.length);
        return surveyList;
};


exports.get = async ({
    instance, surveyId
    }) => {
        const effectiveInstance = instance || 'default';
        await exports.checkInitSurvey(effectiveInstance);
        console.log('get', {instance, surveyId})
        const addr = `/data/${effectiveInstance}/surveys/${surveyId}`;
        const ref = db.ref(addr);
        const result = await ref.once('value');
        const data = result.val();
        return data;
};


exports.answers = async ({
    instance, surveyId, search, first = 0, count = 10
    }) => {
        const effectiveInstance = instance || 'default';
        await exports.checkInitSurvey(effectiveInstance);
        console.log('answers', {instance, surveyId,search, effectiveInstance, first, count})
        const addr = `/data/${effectiveInstance}/answers/${surveyId}`;
        const ref = db.ref(addr);
        //return new Promise(r => ref.once('value', val => f(val)));
        const result = await ref.once('value');
        const data = result.val();
        const lowerSearch = search ? search.toLowerCase() : null;
        let answerList = Object.keys(data)
                    .map(id => ({id, ...data[id]}))
                    .filter(answer => 
                         !search || 
                        (
                            // eslint-disable-next-line eqeqeq
                            answer.id == search ||
                            answer.name.toLowerCase()
                                .indexOf(lowerSearch) >= 0 
                        ))
                    // pagination
                    .slice(first, parseInt(first) + parseInt(count));

        return answerList;
};