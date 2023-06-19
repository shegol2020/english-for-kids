const { JSDOM } = require('jsdom');
// const { playCurrentAudio } = require('./common.js');
function playCurrentAudio(word){
    const audio = document.querySelector(`#audio_${word}`);
    if(audio){
        audio.play();
    }
}


const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;

// test('playCurrentAudio should play audio when it exists', () => {
//     // Create a mock audio element
//     const audioElement = document.createElement('audio');
//     audioElement.play = jest.fn(); // Mock the play() function
//
//     // Append the audio element to the document
//     document.body.appendChild(audioElement);
//
//     // Call the function
//     playCurrentAudio('word');
//
//     // Assert that the play function was called
//     expect(audioElement.play).toHaveBeenCalled();
// });

function compact(array) {
    return array.filter(el => typeof el === "number")

}

 test('compact - array of numbers', () => {
        expect(compact([1, 2, 3])).toEqual([1, 2, 3]);
    });

test('compact - array of numbers and string', () => {
    expect(compact([1, 2, "3"])).not.toEqual([1, 2, 3]);
});

test('compact - no array provided', () => {
    expect(() => compact()).toThrow();
});

test('compact - infinity number in array', () => {
    expect(compact([1, 2, Infinity])).toEqual([1, 2, Infinity]);
});






