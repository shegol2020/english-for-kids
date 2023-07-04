import { Statistics } from "../src/stat/statistics.js";

class StorageMock {
    store = {};

    getItem = (key) => this.store[key];
    setItem = (key, value) => {
        this.store[key] = value;
    };
    removeItem = (key) => {
        delete this.store[key];
    };
    clear = () => {
        this.store = {};
    };
}

describe("statistics test", () => {
    const storage = new StorageMock();
    const stat = new Statistics(storage);

    afterEach(() => {
        // Clear the localStorage after each test
        storage.clear();
    });

    test("put object test should store the object in localStorage with the correct key", () => {
        const obj = { 'card1': { 'right': 0, 'wrong': 0, 'trained': 0 } }
        stat.putObject(obj)

        const storedItem = JSON.parse(storage.getItem('card1'));

        expect(storedItem).toEqual(obj);
    });

    test('put object should overwrite the previous value if the same key is used', () => {
        const obj1 = { 'card1': { 'right': 1, 'wrong': 0, 'trained': 0 } }
        const obj2 = { 'card1': { 'right': 2, 'wrong': 0, 'trained': 0 } }

        stat.putObject(obj1);
        stat.putObject(obj2);

        const storedItem = JSON.parse(storage.getItem('card1'));

        expect(storedItem).toEqual(obj2);
    });
});