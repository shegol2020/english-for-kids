import { stats } from "../src/stat/statistics.js";


describe("statistics test", () => {

    afterEach(() => {
        // Clear the localStorage after each test
        stats.clearStatistics();
    });

    test("put object test should store the object in localStorage with the correct key", () => {
        const obj = { "word": "cry", "right": 0, "wrong": 0, "trained": 0, "errors": 0}
        stats.putObject(obj)

        const storedItem = stats.getObject('cry');

        expect(storedItem).toEqual(obj);
    });

    test('put object should overwrite the previous value if the same key is used', () => {
        const obj1 = { 'card1': { 'right': 1, 'wrong': 0, 'trained': 0 } }
        const obj2 = { 'card1': { 'right': 2, 'wrong': 0, 'trained': 0 } }

        stats.putObject(obj1);
        stats.putObject(obj2);

        const storedItem = JSON.parse(stats.getItem('card1'));

        expect(storedItem).toEqual(obj2);
    });
});