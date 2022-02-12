let time
let score = 0
let isPlaying

var words
async function loadWordsDB() {
  let response = await fetch('wordsDB.json');
  words = await response.json()
  console.log('words', words);
}

loadWordsDB()

const wordInput = document.querySelector('#word-input')
const currentWord = document.querySelector('#current-word')
const scoreDisplay = document.querySelector('#score')
const seconds = document.querySelector('#seconds')
const timeDisplay = document.querySelector('#time')
const message = document.querySelector('#message')
const instructions = document.querySelector('.instructions')

wordInput.disabled = true

const easy = document.querySelector('.easy')
const medium = document.querySelector('.medium')
const hard = document.querySelector('.hard')
easy.onclick = function () {
  if (instructions.style.display !== "none") {
    instructions.style.display = "none";
  } else {
    instructions.style.display = "block";
  }
};

const levels = {
  easy: 25,
  medium: 20,
  hard: 15
};

easy.addEventListener('click', () => {
  time = levels.easy
  wordInput.disabled = false
  medium.disabled = true
  hard.disabled = true
  
})

medium.addEventListener('click', () => {
  time = levels.medium
  wordInput.disabled = false
  easy.disabled = true
  hard.disabled = true
})

hard.addEventListener('click', () => {
  time = levels.hard
  wordInput.disabled = false
  easy.disabled = true
  medium.disabled = true
})

wordInput.addEventListener('focus', init)
var countdownInterval, checkStatusInterval
function init() {
  seconds.innerHTML = time
  showWord(words)
  wordInput.addEventListener('input', startMatch)
  countdownInterval = setInterval(countdown, 1000)
  checkStatusInterval = setInterval(checkStatus, 50)
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length)
  currentWord.innerHTML = words[randIndex]
}

function startMatch() {
  if(matchWords()) {
    console.log("matchWord",score);
    isPlaying = true
    console.log(time);
    time = time + 2
    showWord(words)
    wordInput.value = ''
    score++
  }

  if(score === 0) {
    scoreDisplay.innerHTML = 0
  } else {
    scoreDisplay.innerHTML = score
  }
}

function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!'
    return true
  } else {
    message.innerHTML = ''
    return false
  }
}


function countdown() {
  if(time > 0) {
    time--
  } else if(time === 0) {
    isPlaying = false
    clearInterval(countdownInterval)
  }

  timeDisplay.innerHTML = time
}

function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!'
    wordInput.value = ''
    wordInput.disabled = true
    console.log("checkStatus", score);
    score = 0
    easy.disabled = false
    medium.disabled = false
    hard.disabled = false
    clearInterval(checkStatusInterval)
  }
}
