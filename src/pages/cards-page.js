import "../css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlaySession } from "../play-logic.js"
import { Statistics } from "../stat/statistics.js";


/* selectors */
const card = document.querySelector(".card");
const categoryLink = document.querySelector(".category-link");
const clickableElements = Array.from(card.querySelectorAll(".clickable"));
const cards = document.querySelectorAll(".card");
const switchBtn = document.querySelector(".switch-btn");
const startBtn = document.querySelector(".start-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const quitBtn = document.querySelector(".quit-btn");
const taskText = document.querySelector(".task-text");
const cardImgs = document.querySelectorAll(".card-img-top");
const cardBody = document.querySelectorAll(".card-body");
const cardsContainer = document.querySelector(".cards-container");
const taskTextEl = document.querySelector(".task-text");
const answerContainer = document.querySelector(".answer-container");
const successAudio = new Audio('audio/success.mp3');
const failureAudio = new Audio('audio/failure.mp3');

const statistics = new Statistics(localStorage);
let playSession;
let gameModeOn = false;

/* event listeners */

switchBtn.addEventListener("click", () => {
    switchBtn.classList.toggle("btn-primary");
    switchBtn.classList.toggle("btn-secondary");
    cards.forEach(card => {
        card.classList.toggle("bg-primary");
        card.classList.toggle("bg-secondary");
    })
    startBtn.classList.toggle("active");
});

startBtn.addEventListener("click", () => {
    repeatBtn.classList.add("active");
    quitBtn.classList.add("active");
    startBtn.classList.remove("active");
    taskText.classList.add("active");
    cardBody.forEach(card => {
        card.remove(); //accessibility??
    })
    const currentCardsNames = getCardsNames();
    playSession = new PlaySession(currentCardsNames, statistics);
    const currentCardName = playSession.getCurrentCardName();
    playCurrentAudio(currentCardName);
    renderCurrentWord(currentCardName);
    gameModeOn = true;
});

repeatBtn.addEventListener("click", () => {
    const currentCardName = playSession.getCurrentCardName();
    playCurrentAudio(currentCardName);
});

quitBtn.addEventListener("click", () => {
    finishGame();
});

cardsContainer.addEventListener("click", handleTrainCardClick);
cardsContainer.addEventListener("click", handleGameCardClick);
cardsContainer.addEventListener("mouseover", (e) => {
   //tbd
});

function handleTrainCardClick(e){
    let button = e.target;
    if (button.classList.contains('sound-btn') || button.classList.contains('translation-btn')) {
        if (!gameModeOn) {
            let card = button.closest('.card');
            let cardName = card.getAttribute('data-name');
            if (button.classList.contains('sound-btn')) {
                playSound(cardName);
            }
            if (button.classList.contains('translation-btn')) {
                rotateCard(card);
                statistics.updateTrainedWord(cardName);
            }
        }
    }
}

function playSound(name){
    const audio = document.querySelector(`#audio_${name}`);
    audio.play();
}

function handleGameCardClick(e){
    if (gameModeOn) {
        // if(playSession.isGameFinished()){
        //     cardsContainer.removeEventListener("click", handleGameCardClick);
        // }
        let cardName = e.target.parentElement.parentElement.dataset.name;
        let cardElement = e.target.parentElement.parentElement;
        if (!cardName){
            return
        }
        let isAnswerRight = playSession.guessCard(cardName);
        playAnswerSound(isAnswerRight); //turn on
        let result = playSession.getAnswers();
        const rightAnswers = result.right;
        const wrongAnswers = result.wrong;
        const currentCard = playSession.getCurrentCardName();
        renderResult(rightAnswers, wrongAnswers);
        if(isAnswerRight){
            blockCard(cardElement);
            playCurrentAudio(currentCard); //async?
            renderCurrentWord(currentCard);
            if(playSession.isGameFinished()){
                finishGame(rightAnswers, wrongAnswers);
                cardsContainer.removeEventListener("click", handleGameCardClick);
            }
        }
    }

}

function playCurrentAudio(word){
    const audio = document.querySelector(`#audio_${word}`);
    if(audio){
        audio.play();
    }
}

function renderCurrentWord(word){
    taskTextEl.innerText = `Find ${word}`;
    return taskTextEl.innerText
}


function getCardsNames(){
    const cardElements = document.querySelectorAll('.card');
    const wordList = [];
    cardElements.forEach(card => {
        wordList.push(card.dataset.name);
    })
    return wordList;
}

function playAnswerSound(isAnswerRight){
    if(isAnswerRight){
        successAudio.play();
    } else {
        failureAudio.play();
    }
}

function blockCard(card){
    card.classList.add("pe-none", "grayscale");
}

function renderResult(rightAnswers, wrongAnswers) {
    while (answerContainer.firstChild) {
        answerContainer.firstChild.remove();
    }
    for (let i=1; i<=rightAnswers; i++){
        renderAnswers("right");
    }
    for (let i=1; i<=wrongAnswers; i++){
        renderAnswers("wrong");
    }
}

function renderAnswers(type){
    const newEl = document.createElement("div");
    const icon = document.createElement("i");
    if (type==="right"){
        icon.setAttribute("class", "fa-solid fa-check fa-lg");
    }
    if (type==="wrong"){
        icon.setAttribute("class", "fa-regular fa-circle-xmark fa-xl");
    }
    newEl.append(icon);
    answerContainer.append(newEl);
}

function finishGame(rightAnswers, wrongAnswers){
    repeatBtn.classList.remove("active");
    quitBtn.classList.remove("active");
    taskText.classList.remove("active");
    // startBtn.classList.add("active"); //turn on after debugging
    cardImgs.forEach(card => card.classList.add("inactive-image"));
    while (answerContainer.firstChild) {
        answerContainer.firstChild.remove();
    }
    if(rightAnswers || wrongAnswers){
        popup.classList.remove("hidden");
        popupText.innerText = `Congratulations! You have ${rightAnswers} right answers and ${wrongAnswers} wrong answers.`;
    }

}

function rotateCard(card){
    const frontSide = card.firstElementChild;
    const backSide = card.children[1];
    frontSide.classList.toggle("hidden");
    backSide.classList.toggle("hidden");
}


/* pop-up */

const popup = document.querySelector(".popup");
const popupBtn = document.querySelector(".popup-close-btn");
const popupText = document.querySelector(".popup-text");

popupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
})
