const db = require('../firebase').database;

console.log(db);

exports.checkInitSurvey = async (instance = 'default') => {
    const data = await db.ref(`/data/${instance}/surveys`).once('value');
    if (!data){
        console.log(`creating repo ${instance}`);
        const orginalData = await db.ref(`/data/__template`).once('value');
        await db.ref(`/data/${instance}`).set(orginalData)
    }
};

exports.list = async ({
    instance, search, active
    }) => {
        const data = await db.ref(`/data/${instance}/surveys`).once('value');
        return data;
};


