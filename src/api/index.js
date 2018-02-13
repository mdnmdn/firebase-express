const db = require('../firebase').admin.database();

//console.log(db);

exports.checkInitSurvey = async (instance = 'default') => {
    const data = await db.ref(`/data/${instance}/surveys`).once('value');
    if (!data){
        console.log(`creating repo ${instance}`);
        const orginalData = await db.ref(`/data/__template`).once('value');
        await db.ref(`/data/${instance}`).set(orginalData)
    }
};

exports.list = async ({
    instance, search, active, first = 0, count = 10
    }) => {
        const effectiveInstance = instance || 'default';
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
                        active == survey.active)
                    // pagination
                    .slice(first, first + count);
        return surveyList;
};


