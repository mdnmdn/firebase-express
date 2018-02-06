'use strict';

const express = require('express');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const l = console.log.bind(console);

const app = express();

const originalData = require('../../../../assets/data');

const answerMap = { 1: 'A', 2: 'B', 3: 'C' };

app.get('/', (req, res) => {
    const data = {
        surveys: {},
        answers: {}
    };

    l(`length: ${originalData.length}`);

    originalData.forEach(origSurvey => {
        const survey = {
            id: parseInt(origSurvey.Id),
            name: origSurvey.Name,
            description: origSurvey.Description,
            active: origSurvey.Active,
            questions: []
        };

        if (origSurvey.Question1) {
            const question = {
                description: origSurvey.Question1,
                answers: {
                    'A': origSurvey.Answer1A,
                    'B': origSurvey.Answer1B,
                    'C': origSurvey.Answer1C
                }
            };
            survey.questions.push(question);
        }

        if (origSurvey.Question2) {
            const question = {
                description: origSurvey.Question2,
                answers: {
                    'A': origSurvey.Answer2A,
                    'B': origSurvey.Answer2B,
                    'C': origSurvey.Answer2C
                }
            };
            survey.questions.push(question);
        }

        if (origSurvey.Question3) {
            const question = {
                description: origSurvey.Question3,
                answers: {
                    'A': origSurvey.Answer3A,
                    'B': origSurvey.Answer3B,
                    'C': origSurvey.Answer3C
                }
            };
            survey.questions.push(question);
        }

        if (origSurvey.Answers && origSurvey.Answers.length) {
            const answers = {};

            origSurvey.Answers.forEach(originalAnswer => {
                const answer = {
                    id: parseInt(originalAnswer.Id),
                    name: originalAnswer.UserName,
                    ts: moment(originalAnswer.CompilationDate).toISOString(),
                    surveyId: survey.id,
                    answers: []
                };

                if (originalAnswer.Answer1) {
                    answer.answers[0] = answerMap[originalAnswer.Answer1];
                }

                if (originalAnswer.Answer2) {
                    answer.answers[1] = answerMap[originalAnswer.Answer2];
                }

                if (originalAnswer.Answer3) {
                    answer.answers[2] = answerMap[originalAnswer.Answer3];
                }

                answers[answer.id] = answer;
            });

            data.answers[survey.id] = answers;
        }

        data.surveys[survey.id] = survey;
    });

    fs.writeFileSync(path.join(__dirname, '../../data/initialdata.json'), JSON.stringify(data, null, 2));

    res.send(data);
});

app.get('/orig', (req, res) => {
    res.send(originalData);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
//# sourceMappingURL=test_data.js.map