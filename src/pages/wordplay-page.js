import "../css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cardHtml from "../../templates/partials/card.hbs"
import cardsContainer from"../../templates/partials/cards-container.hbs"
import { stats } from "../stat/statistics.js";
import categories from "../../cards.json" assert { type: "json" };


const cardContent = cardHtml();
const cardsContainerContent = cardsContainer();
document.body.innerHTML = cardsContainerContent;
const parser = new DOMParser();

const cardsContainerEl = document.querySelector(".cards-container");
cardsContainerEl.setAttribute("class", "container cards-container")
const cardNode = parser.parseFromString(cardContent, 'text/html').body.firstChild.cloneNode(true);

const getCardEl = () => { return cardNode.cloneNode(true); }

function getTranslation(key){
    const wordsArray = categories.flatMap(category =>
        category.cards.map(card => ({
            word: card.word,
            translation: card.translation
        }))
    );
    const foundWord = wordsArray.find(wordObj => wordObj.word === key);
    return foundWord.translation;
}


function generateCardNode(names){
    names.forEach(name => {
        const card = getCardEl();
        card.id = `card_${name}`;
        card.dataset.name = name;

        const cardImgs = card.querySelectorAll(".card-img-top");
        cardImgs.forEach(cardImg => {
            cardImg.src = `/img/cards/${name}.jpg`
        });


        const cardTitle = card.querySelector(".card-title");
        cardTitle.innerText = name;

        const cardTitleBack = card.querySelector(".card-title-back");
        cardTitleBack.innerText = getTranslation(name);

        const cardAudio = card.querySelector("audio");
        cardAudio.setAttribute("id", `audio_${name}`);
        const audioSrc = cardAudio.querySelector("source");
        audioSrc.src = `/audio/${name}.mp3`

        cardsContainerEl.append(card);
    })

}

function formTrainedList(wordList){
    return wordList.map(obj => obj.word)
}

let trainedList = formTrainedList(stats.getTopErrors(8));

generateCardNode(trainedList);




