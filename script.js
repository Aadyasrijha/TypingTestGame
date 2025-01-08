// JavaScript with typing sound and result modal
const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const timeLimitInput = document.getElementById('time-limit');
const gameArea = document.getElementById('game-area');
const resultModal = document.getElementById('result-modal');
const finalWpm = document.getElementById('final-wpm');
const finalAccuracy = document.getElementById('final-accuracy');
const closeModalBtn = document.getElementById('close-modal');

const typingSound = new Audio('https://www.soundjay.com/button/sounds/button-29.mp3'); // Add a typing sound

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Focus and type with all your might!",
    "Speed comes with practice and patience.",
    "Every keypress is a step closer to mastery.",
    "Believe in yourself and keep typing!"
];

let currentSentence = '';
let timeLeft = 60;
let timer;
let typedCharacters = 0;
let mistakes = 0;

// Function to pick a random sentence
function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// Function to start the game
function startGame() {
    timeLeft = parseInt(timeLimitInput.value) || 60;
    timerElement.textContent = timeLeft;

    currentSentence = getRandomSentence();
    textDisplay.textContent = currentSentence;
    textInput.value = '';
    textInput.disabled = false;

    typedCharacters = 0;
    mistakes = 0;

    gameArea.style.display = 'block';
    restartBtn.style.display = 'inline-block';
    startBtn.style.display = 'none';
    resultModal.style.display = 'none';

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
    } else {
        clearInterval(timer);
        textInput.disabled = true;
        showResults();
    }
}

// Function to show results
function showResults() {
    finalWpm.textContent = wpmElement.textContent;
    finalAccuracy.textContent = accuracyElement.textContent;
    resultModal.style.display = 'flex';
}

// Event listener for input
textInput.addEventListener('input', () => {
    const typedText = textInput.value;
    typingSound.play();

    typedCharacters++;
    if (currentSentence.startsWith(typedText)) {
        textDisplay.style.color = 'green';
    } else {
        textDisplay.style.color = 'red';
        mistakes++;
    }

    if (typedText === currentSentence) {
        textInput.value = '';
        currentSentence = getRandomSentence();
        textDisplay.textContent = currentSentence;
    }

    const wordsTyped = typedCharacters / 5;
    const wpm = Math.round(wordsTyped / ((parseInt(timeLimitInput.value) - timeLeft) / 60));
    const accuracy = Math.max(0, Math.round(((typedCharacters - mistakes) / typedCharacters) * 100));

    wpmElement.textContent = wpm || '0';
    accuracyElement.textContent = accuracy || '100';
});

// Event listener for restart button
restartBtn.addEventListener('click', startGame);

// Event listener for close modal button
closeModalBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

// Event listener for start button
startBtn.addEventListener('click', startGame);
