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
        question: "Ali merupakan seorang pelajar yang berumur 20 tahun. Berapakah jumlah dekad jika ditukarkan unit tahun kepada dekad?",
        choice1: "1 dekad",
        choice2: "2 dekad",
        choice3: "3 dekad",
        choice4: "4 dekad",
        answer: 2,
    },
    {
        question:
            "Satu abad bersamaan berapa tahun?",
        choice1: "100 tahun",
        choice2: "200 tahun",
        choice3: "300 tahun ",
        choice4: "400 tahun",
        answer: 1,
    },
    {
        question: "Ahmad mengambil masa 2 minit bagi memakai kasut. Berapakah jumlah saat jika minit itu ditukar kepada unit saat?",
        choice1: "30 saat",
        choice2: "60 saat",
        choice3: "120 saat",
        choice4: "150 saat",
        answer: 3,
    },
	{
        question: "Faris menyiapkan kerja sekolahnya selama 2 jam. Berapakah jumlah minit jika unit jam ditukarkan kepada minit?",
        choice1: "60 minit",
        choice2: "100 minit",
        choice3: "110 minit",
        choice4: "120 minit",
        answer: 4,
    },
    {
        question: "Soleha telah melancong ke luar negara yang mengambil masa 2 hari untuk sampai apabila menaiki kapal terbang. Berapakah jumlah jam apabila hari ditukar kepada unit jam?",
        choice1: "24 jam",
        choice2: "48 jam",
        choice3: "72 jam",
        choice4: "96 jam",
        answer: 2,
    },
	{
		question: "Fosil tembikar ini telah berusia 3000 tahun. Maka usia fosil tembikar itu dikenali sebagai ........ alat?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 3,
	},
	{
		question: "Jason pergi bercuti bersam-sama keluarganya di Sarawak selama 3 hari. Nyatakan 3 hari dalam jam?",
        choice1: "24 jam",
        choice2: "48 jam",
        choice3: "60 jam",
        choice4: "72 jam",
        answer: 4,
	},
	{
		question: "Balqish telah menduduki rumah ibu bapanya selama 2 dekad. Nyatakan 2 dekad dalam tahun?",
        choice1: "10 tahun",
        choice2: "20 tahun",
        choice3: "30 tahun",
        choice4: "40 tahun",
        answer: 2,
	},
	{
		question: "Reban ayam Saleh dijangka akan siap dalam masa 4 jam. Berapakah jumlah 4 jam dalam minit?",
        choice1: "240 minit",
        choice2: "180 minit",
        choice3: "120 minit",
        choice4: "60 minit",
        answer: 1,
	},
	{
		question: "Telur ayam akan mengambil masa 8 minit untuk masak apabila direbus. Berapakah jumlah 8 minit dalam saat?",
        choice1: "120 saat",
        choice2: "360 saat",
        choice3: "480 saat",
        choice4: "540 saat",
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