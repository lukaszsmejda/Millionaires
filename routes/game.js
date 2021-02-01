function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false
    let callToAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;


    const questions = [
        {
            question: 'What is the best coding langauge in you opinion',
            answers: ['c++', 'fortran', 'javascript', 'java'],
            correctAnswer: 1,
        },
        {
            question: 'Capital city of Poland',
            answers: ['Berlin', 'London', 'Los Angeles', 'Warsaw'],
            correctAnswer: 3,
        },
        {
            question: ' The Longest river in the world',
            answers: ['Nile', 'Odra', 'Amazon', 'Yangtze'],
            correctAnswer: 0,
        }
    ];



    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            });
        } else if (isGameOver) {
            res.json({
                loser: true,
            })
        } else {
            const nextQuestion = questions[goodAnswers];
            const { question, answers } = nextQuestion;
            res.json({
                question, answers
            })
        }
    })

}

module.exports = gameRoutes;