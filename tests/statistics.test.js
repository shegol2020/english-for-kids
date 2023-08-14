import {Statistics, stats} from "../src/stat/statistics.js";
import {afterEach, beforeEach, describe, expect, test, jest} from '@jest/globals'
import {PlaySession} from "../src/play-logic.js";


describe("statistics test", () => {

    afterEach(() => {
        stats.clearStatistics();
        jest.clearAllMocks();
    });

    test("putObject test should store the object in localStorage with the correct key", () => {
        const obj = { "word": "cry", "right": 0, "wrong": 0, "trained": 0, "errors": 0}
        stats.putObject(obj)
        const storedItem = stats.getObject('cry');
        expect(storedItem).toEqual(obj);
    });

    test('put object should overwrite the previous value if the same key is used', () => {
        const obj1 = { "word": "cry", "right": 0, "wrong": 0, "trained": 0, "errors": 0}
        const obj2 = { "word": "cry", "right": 1, "wrong": 0, "trained": 0, "errors": 0}
        stats.putObject(obj1);
        stats.putObject(obj2);
        const storedItem = stats.getObject("cry");
        expect(storedItem).toEqual(obj2);
    });

    test('getCurrentObject returns the current object if it exists', () => {
        const existingCard = 'dive';
        const existingObject = { word: 'dive', right: 1, wrong: 0, trained: 1, errors: 0 };
        stats.putObject(existingObject);
        const result = stats.getCurrentObject(existingCard);
        expect(result).toEqual(existingObject);
    });

    test('getCurrentObject returns a new object if the current object does not exist', () => {
        const nonExistingCard = 'nonExistingCard';
        const defaultObject = { word: 'nonExistingCard', right: 0, wrong: 0, trained: 0, errors: 0 };
        const result = stats.getCurrentObject(nonExistingCard);
        expect(result).toEqual(defaultObject);
    });

    test('updateRightAnswer increases right answers count', () => {
        stats.getCurrentObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateRightAnswer()
        expect(currentObj.right).toBe(1)
    });

    test('updateRightAnswer calls putObject with current object', () => {
        stats.getCurrentObject = jest.fn();
        stats.putObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateRightAnswer()
        expect(stats.putObject).toHaveBeenCalledWith(currentObj);
    });

    test('updateWrongAnswer increases wrong answers count', () => {
        stats.getCurrentObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateWrongAnswer()
        expect(currentObj.wrong).toBe(2)
    });

    test('updateWrongAnswer calls putObject with current object', () => {
        stats.getCurrentObject = jest.fn();
        stats.putObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateWrongAnswer()
        expect(stats.putObject).toHaveBeenCalledWith(currentObj);
    });

    test('updateTrainedWord increases trained answers count', () => {
        stats.getCurrentObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateTrainedWord()
        expect(currentObj.trained).toBe(1)
    });

    test('updateTrainedWord calls putObject with current object', () => {
        stats.getCurrentObject = jest.fn();
        stats.putObject = jest.fn();
        const currentObj = { "word": "test", "right": 0, "wrong": 1, "trained": 0, "errors": 100};
        stats.getCurrentObject.mockReturnValue(currentObj);
        stats.updateTrainedWord()
        expect(stats.putObject).toHaveBeenCalledWith(currentObj);
    });

    test('errorCountUpdate returns the percentage of errors based on right and wrong counts', () => {
        const currentObj = { right: 2, wrong: 2 };
        const result = stats.errorCountUpdate(currentObj);
        expect(result).toBe(50);
    });

    test(`getWordsFromStorage returns storage word object with key without "word" and with object as a value (not string)`, () => {
        stats.storage.setItem("word/cry", `{ "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}`);
        const expectedResult = { "cry": { "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}}
        const result = stats.getWordsFromStorage();
        expect(result).toEqual(expectedResult);
    });

    test(`getWordsFromStorage returns empty object if there is no word objects`, () => {
        stats.storage.setItem(`test key`, `test value`);
        const result = stats.getWordsFromStorage();
        const keys = Object.getOwnPropertyNames(result);
        expect(keys.length).toBe(0)
    });

    test(`getTopErrors returns 1 object when it is called with argument 1 (same length)`, () => {
        stats.storage.setItem("word/cry", `{ "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}`);
        stats.storage.setItem("word/swim", `{ "word": "swim", "right": 1, "wrong": 1, "trained": 0, "errors": 50}`);
        const result = stats.getTopErrors(1);
        expect(result.length).toBe(1)
    });

    test(`getTopErrors returns all objects when it is called with argument more than objects' quantity`, () => {
        stats.storage.setItem("word/cry", `{ "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}`);
        stats.storage.setItem("word/swim", `{ "word": "swim", "right": 1, "wrong": 1, "trained": 0, "errors": 50}`);
        const result = stats.getTopErrors(3);
        expect(result.length).toBe(2)
    });

    test(`getTopErrors sort objects in descending order`, () => {
        stats.storage.setItem("word/swim", `{ "word": "swim", "right": 1, "wrong": 1, "trained": 0, "errors": 50}`);
        stats.storage.setItem("word/cry", `{ "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}`);
        const result = stats.getTopErrors(3);
        expect(result[0].word).toBe("cry")
    });

    test(`getTopErrors returns only objects with errors (objects will 0 errors are ignored)`, () => {
        stats.storage.setItem("word/cry", `{ "word": "cry", "right": 0, "wrong": 1, "trained": 0, "errors": 100}`);
        stats.storage.setItem("word/swim", `{ "word": "swim", "right": 1, "wrong": 1, "trained": 0, "errors": 0}`);
        const result = stats.getTopErrors(3);
        expect(result.length).toBe(1)
    });


});

