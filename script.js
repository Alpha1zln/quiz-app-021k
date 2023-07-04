const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 -2 * 2?',
    answers: [
      { text: '-2', correct: true },
      { text: '0', correct: false }
    ]
  },
  {
    question: 'Father of C language ?',
    answers: [
      { text: 'Dennis Ritchie', correct: true },
      { text: 'James Gosling', correct: false },
      { text: 'Bjarne Stroustrup ', correct: false },
      { text: 'Guido van Rossum', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'CODE HELP ', correct: true },
      { text: 'Code with Harry', correct: true },
      { text: 'Carrer code camp', correct: true },
      { text: 'TUF- TAKE U FORWARD', correct: true }
    ]
  },
  {
    question: 'What is the Capital city of Australia ?',
    answers: [
      { text: 'Amsterdam', correct: false },
      { text: 'Canberra', correct: true },
      { text: 'Wellington', correct: false },
      { text: 'Copenhagen', correct: false }
    ]
  },
  {
    question: 'What is 14 * 12?',
    answers: [
      { text: '156', correct: false },
      { text: '168', correct: true }
    ]
  }
]
