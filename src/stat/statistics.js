export class Statistics {
    constructor(storage) {
        this.storage = storage;
    }
    putObject(obj){
        let key = `word/${obj["word"]}`;
        this.storage.setItem(key, JSON.stringify(obj));
    }
    getObject(key){
        let retrievedObjectString = this.storage.getItem(`word/${key}`);
        return retrievedObjectString ? JSON.parse(retrievedObjectString) : undefined;
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
    }
    updateWrongAnswer(card){
        let currentObj = this.getCurrentObject(card);
        currentObj.wrong++;
        currentObj.errors = this.errorCountUpdate(currentObj);
        this.putObject(currentObj);
    }
    updateTrainedWord(card){
        let currentObj = this.getCurrentObject(card);
        currentObj.trained++;
        this.putObject(currentObj);
    }
    errorCountUpdate(currentObj){
        const sum = currentObj.right+currentObj.wrong;
        const errors = Math.round((currentObj.wrong / sum) * 100);
        return errors;
    }
    clearStatistics(){
        this.storage.clear();
    }

    getWordsFromStorage(){
        const allData = {};
        const storageKeys = Object.keys(this.storage);

        storageKeys.forEach(key => {
            if (key.startsWith("word/")) {
                const valueString = this.storage.getItem(key);
                const valueObject = JSON.parse(valueString);
                allData[key] = valueObject;
            }
        });
        const cleanedData = this.cleanWords(allData);
        return cleanedData;
    }
    cleanWords(storageList){ //"word/cry" => "cry"
        let cleanedList = {};
        for (let key in storageList) {
            const newValue = storageList[key];
            const newKey = key.slice(5);
            cleanedList[newKey] = newValue;
        }
        return cleanedList
    }
    getTopErrors(number){
        const words = this.getWordsFromStorage();
        const filteredWords = Object.values(words).filter(word => word.errors !== 0);
        const sortedWords = filteredWords.sort((a, b) => b.errors - a.errors);
        if(sortedWords.length < number){
            return sortedWords
        } else {
            return sortedWords.slice(0, number);
        }
    }
}

class StorageParentMock {
    getItem (key){
        return this[key];
    }
    setItem (key, value)  {
        this[key] = value;
    };
    removeItem (key) {
        delete this[key];
    };
    clear() {
        const keys = Object.getOwnPropertyNames(this);
        keys.forEach(key => this.removeItem(key))
    };
}

export class StorageMock extends StorageParentMock{

}

export const stats = (() => {
    if (typeof localStorage !== 'undefined') {
        return new Statistics(localStorage);
    }
   return new Statistics(new StorageMock())
})();

