export class PlaySession {
    gameCardSeq = [];
    _currentCard = null;
    answerCount = 0;
    rightAnswersCount = 0;
    wrongAnswersCount = 0;

    constructor(cards, statistics) {
        let mixedCards = this.shuffleArray(cards);
        this.gameCardSeq.push(...mixedCards);
        this.nextCard();
        this.statistics = statistics;
    }

    shuffleArray(array) {
        let newArr = [...array]
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    getCurrentCardName(){
        return this._currentCard;
    }

    nextCard(){
        this._currentCard = this.gameCardSeq.pop();
    }

    isGameFinished(){
       return !this._currentCard;
    }

    guessCard(card) {
        let isRight = false;
        if (card === this._currentCard) {
            isRight = true;
            this.answerCount++;
            this.rightAnswersCount++;
            this.statistics.updateRightAnswer(card);
            this.nextCard();
        } else {
            this.answerCount++;
            this.wrongAnswersCount++;
            this.statistics.updateWrongAnswer(this._currentCard);
        }
        return isRight;
    }

    getAnswers(){
        return {
            "right": this.rightAnswersCount,
            "wrong": this.wrongAnswersCount
        };
    }
}