export class Statistics {
    constructor(storage) {
        this.storage = storage;
    }
    putObject(obj){
        let key = obj["word"];
        this.storage.setItem(key, JSON.stringify(obj));
    }
    getObject(key){
        let retrievedObjectString = this.storage.getItem(key);
        return JSON.parse(retrievedObjectString)
    }
    getCurrentObject(card){
        let currentObj = this.getObject(card);
        if (!currentObj) {
            currentObj = { "word": card, "right": 0, "wrong": 0, "trained": 0, "errors": 0}
        }
        return currentObj
    }
    updateRightAnswer(card){
        let currentObj = this.getCurrentObject(card);
        currentObj.right++;
        currentObj.errors = this.errorCountUpdate(currentObj);
        this.putObject(currentObj);
        console.log(this.getObject(card));
    }
    updateWrongAnswer(card){
        let currentObj = this.getCurrentObject(card);
        currentObj.wrong++;
        currentObj.errors = this.errorCountUpdate(currentObj);
        this.putObject(currentObj);
        console.log(this.getObject(card));

    }
    updateTrainedWord(card){
        let currentObj = this.getCurrentObject(card);
        currentObj.trained++;
        this.putObject(currentObj);
        console.log(this.getObject(card));
    }
    errorCountUpdate(currentObj){
        const sum = currentObj.right+currentObj.wrong;
        const errors = currentObj.wrong/sum*100;
        return errors;
    }
    clearStatistics(){
        this.storage.clear();
    }
    getAllStorage(){
        const allData = {};
        Object.keys(this.storage).forEach(key => {
            const valueString = this.storage.getItem(key);
            const valueObject = JSON.parse(valueString);
            allData[key] = valueObject;
        });
        return allData;
    }
    getTopErrors(number){
        const words = this.getAllStorage();
        const sortedWords = Object.values(words).sort((a, b) => b.errors - a.errors);
        if(sortedWords.length < number){
            return sortedWords
        } else {
            return sortedWords.slice(0, number);
        }
    }
}