
const question = document.querySelector('#question')
const gameBoard = document.querySelector('#game-board')
const h2 = document.querySelector('h2')



function fillQuestionElements(data) {
    question.innerText = data.question
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'Winner';
        return;
    }

    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'Loser';
        return;
    }

    for (const i in data.answers) {

        const answersEl = document.querySelector(`#answer${Number(i) + 1}`)
        answersEl.innerText = data.answers[i]
    }


}


function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => fillQuestionElements(data));
}

showNextQuestion()


function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(r => r.json())
        .then(data => handleAnswerFeedback(data));

}


const buttons = document.querySelectorAll('.answer-btn');

for (const button of buttons) {
    button.addEventListener('click', (event) => {

        const answerIndex = event.target.dataset.answer;
        console.log(answerIndex)
        sendAnswer(answerIndex)

    })
}
