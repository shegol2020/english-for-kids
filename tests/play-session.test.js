import { PlaySession } from "../src/play-logic.js";

import {afterEach, beforeEach, describe, expect, test, jest} from '@jest/globals'

describe('PlaySession', () => {
    let playSession;
    let statistics;
    const cardsNames = ["cry", "dance", "fish", "jump", "skip"]

    beforeEach(() => {
        const Statistics = jest.fn(() => {})
        statistics = new Statistics()
        statistics.updateRightAnswer = jest.fn();
        statistics.updateWrongAnswer = jest.fn();
        playSession = new PlaySession(cardsNames, statistics);
    });

    test(`after initialising in constructor gamesCardSeq is one card less than cardsNames`, () => {
        expect(playSession.gameCardSeq).toHaveLength(cardsNames.length - 1); //cardsNames.pop() in constructor
    });

    test(`after initialising in constructor current card is not null`, () => {
        expect(playSession._currentCard).not.toBeNull();
    });

    test(`after initialising in constructor answers' count is 0`, () => {
        expect(playSession.answerCount).toBe(0);
    });

    test(`after initialising in constructor right answers' count is 0`, () => {
        expect(playSession.rightAnswersCount).toBe(0);
    });

    test(`after initialising in constructor wrong answers' count is 0`, () => {
        expect(playSession.wrongAnswersCount).toBe(0);
    });

    test(`shuffleArray should correctly shuffle an array`, () => {
        const array = [1, 2, 3, 4, 5];
        const shuffledArray = playSession.shuffleArray(array);
        expect(shuffledArray).not.toEqual(array);
    });

    test(`getCurrentName should get the current card name`, () => {
        playSession._currentCard = 'Card 1';
        expect(playSession.getCurrentCardName()).toBe('Card 1');
    });

    test(`isGameFinished returns true if current card is false (no more current cards)`, () => {
        playSession._currentCard = false;
        expect(playSession.isGameFinished()).toBe(true);
    });

    test(`isGameFinished returns false if current card is present`, () => {
        playSession._currentCard = "Card 1";
        expect(playSession.isGameFinished()).toBe(false);
    });

    test(`guessCards returns true when guessed card is equal to current card (word is guessed)`, () => {
        const isRight = playSession.guessCard(playSession._currentCard);
        expect(isRight).toBe(true);
    });

    test(`correct guessed word increases answer count`, () => {
        playSession.guessCard(playSession._currentCard);
        expect(playSession.answerCount).toBe(1);
    });

    test(`correct guessed word increases right answer count`, () => {
        playSession.guessCard(playSession._currentCard);
        expect(playSession.rightAnswersCount).toBe(1);
    });

    test(`correct guessed word calls updateRightAnswer function with current card`, () => {
        const currentCard = playSession._currentCard;
        playSession.guessCard(currentCard);
        expect(statistics.updateRightAnswer).toHaveBeenCalledWith(currentCard);
    });

    test(`guessCards returns false when guessed card is not equal to current card (word is not guessed)`, () => {
        const wrongCard = "";
        const isRight = playSession.guessCard(wrongCard);
        expect(isRight).toBe(false);
    });

    test(`incorrect guessed word increases answer count`, () => {
        const wrongCard = "";
        const isRight = playSession.guessCard(wrongCard);
        expect(playSession.answerCount).toBe(1);
    });

    test(`incorrect guessed word increases wrong answer count`, () => {
        const wrongCard = "";
        const isRight = playSession.guessCard(wrongCard);
        expect(playSession.wrongAnswersCount).toBe(1);
    });

    test(`incorrect guessed word calls updateWrongAnswer function with current card`, () => {
        const wrongCard = "";
        const currentCard = playSession._currentCard;
        playSession.guessCard(wrongCard);
        expect(statistics.updateWrongAnswer).toHaveBeenCalledWith(currentCard);
    });

    test(`getAnswers returns object with right and wrong answers' count`, () => {
        playSession.rightAnswersCount = 5;
        playSession.wrongAnswersCount = 10;
        const result = {
            "right": 5,
            "wrong": 10
        };
        expect(playSession.getAnswers()).toEqual(result);
    });
});







