const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Apakah nama mata wang Kemboja?",
        choice1: "Dong",
        choice2: "Baht",
        choice3: "Riel",
        choice4: "Ringgit",
        answer: 3,
    },
    {
        question:
            "Apakah nama-nama mata wang di negara ASEAN?",
        choice1: "Yen, Ringgit, Peso",
        choice2: "US Dollar, Won, Rupiah",
        choice3: "Kyat, Yen, Brunei Dollar ",
        choice4: "Ringgit, Peso, Kip",
        answer: 4,
    },
    {
        question: "Jumlahkan RM100 (30 keping) + RM50 (10 keping + RM 20 (3 keping) + RM10 (4 keping)",
        choice1: "RM3600",
        choice2: "RM4600",
        choice3: "RM2600",
        choice4: "RM5600",
        answer: 1,
    },
	{
        question: "Fateha mempunyai RM50 (17 keping), RM20 (3 keping) dan RM1 (4 keping). Berapakah jumlah wang Fateha?",
        choice1: "RM924",
        choice2: "RM854",
        choice3: "RM914",
        choice4: "RM484",
        answer: 3,
    },
    {
        question: "Berapa keping not yang diperlukan bagi RM1557?",
        choice1: "RM100 (5 keping), RM50 (1 keping), RM1 (7 keping)",
        choice2: "RM100 (15 keping), RM50 (1 keping), RM1 (7 keping)",
        choice3: "RM100 (10 keping), RM 50 (3 keping), RM1 (7 keping)",
        choice4: "RM100 (15 keping), RM50 (1 keping), RM1 (5 keping)",
        answer: 2,
    },
	{
        question: "Apakah nama matawang negara Korea",
        choice1: "Yen",
        choice2: "Yuan",
        choice3: "Won",
        choice4: "Taka",
        answer: 3,
    },
	{
        question: "Apakah nama matawang negara Great Britain",
        choice1: "Pound",
        choice2: "UK Dollar",
        choice3: "Euro",
        choice4: "Swiss franc",
        answer: 1,
    },
	{
        question: "Apakah nama matawang negara Bangladesh",
        choice1: "Rupee",
        choice2: "Bang Dollar",
        choice3: "Riyal",
        choice4: "Taka",
        answer: 4,
    },
	{
        question: "Apakah nama matawang negara Australia",
        choice1: "Australia Dollar",
        choice2: "Australia Pound",
        choice3: "Australia Euro",
        choice4: "Australia Roos",
        answer: 1,
    },
	{
        question: "Apakah nama matawang negara India, China dan Jepun",
        choice1: "Rupee, Yen, Yuan",
        choice2: "Taka, Won, Yen",
        choice3: "Rupee, Yuan, Yen",
        choice4: "Taka, Yen, Won",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()