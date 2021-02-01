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

    app.post('/answer/:index', (req, res) => {
        if (isGameOver) {
            res.json({
                loser: true
            })
        }


        const { index } = req.params


        const currentQuestion = questions[goodAnswers]


        const isGoodAnswer = currentQuestion.correctAnswer === Number(index)
        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswers
        })
    })

    app.get('/help/friend', (req, res) => {
        if (callToAFriendUsed) {
            return res.json({
                text: 'Call to a friend already used ',
            });
        }

        callToAFriendUsed = true;

        const doesTheFriendKnowAnswer = Math.random() < 0.5;

        const nextQuestion = questions[goodAnswers];

        res.json({

            text: doesTheFriendKnowAnswer ? `I think that the answer is ${nextQuestion.answers[nextQuestion.correctAnswer]}` : "Sorry but I can't help you, I dont know the answer"
        })
    })


    app.get('/help/half', (req, res) => {

        if (halfOnHalfUsed) {
            return res.json({
                text: 'Half on half used'
            })
        }

        halfOnHalfUsed = true;

        const question = questions[goodAnswers]

        const answersCopy = question.answers.filter((s, index) => (
            index !== question.correctAnswer
        ))

        answersCopy.splice(~~(Math.random() * answersCopy.length), 1)


        res.json({
            answersToRemove: answersCopy,
        })

    })
}

module.exports = gameRoutes;