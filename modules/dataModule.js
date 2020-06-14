let dataModule = (function () {
  let appData = {
    indicators: {
      testStarted: false,
      testEnded: false,
      totaltestTime: 0,
      timeLeft: 0,
    },
    results: {
      wpm: 0, //word per minute
      wpmChange: 0,
      cpm: 0, //character per minute
      cpmChange: 0,
      accurancy: 0,
      accurancyChange: 0,
      numOfCorrectWords: 0,
      numOfCorrectCharacters: 0,
      numOfTestCharacters: 0,
    },
    words: {
      currentWordIndex: 0,
      testWords: [],
      currentWords: {},
    },
  };

  //word constructor
  //{
  //    value: {correct:'', user:'', isCorrect:false},
  //    characters: {correct:[], user:[], totalCorrect:0,totalTest:0}
  // }

  let word = function (index) {};

  //update method
  word.prototype.update = function (value) {};

  return {
    //indicators - test Control
    setTestTime: function (x) {}, //sets the total test time to x
    initializeTimeLeft: function () {}, // initializes time left to the total test time
    startTest: function () {}, //starts the test
    endTest: function () {}, //ends the test
    getTimeLeft: function () {}, //return the remaining test time
    reduceTime: function () {}, //reduces the time by one second
    timeLeft: function () {}, //checks if there is time left to continue the test
    testEnded: function () {}, //checks if the test has already ended
    testStarted: function () {}, //checks if the test has started

    //results
    calculateWpm: function () {}, //calculates wpm and wpmChange and updates them in appData
    calculateCpm: function () {}, //calculates cpm and cpmChange and updates them in appData
    calculateAccurancy: function () {}, //calculates accurancy and accurancyChange and updates them in appData

    //test words
    fillListOfTestWords: function (textNumber) {}, //fills words.testWords
    getListOfTestWords: function () {}, //get list of test words: words.testWords
    moveToNewWord: function () {}, // increments the currentWordIndex - updates the current word(appData.words.currentWord)
    //by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters
    updateCurrentWord: function (value) {}, // updates current word using user input
  };
})();