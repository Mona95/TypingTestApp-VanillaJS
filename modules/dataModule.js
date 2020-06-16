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

  let lineReturn = "|";

  let shuffle = (array) => {
    let newArray = [],
      randomIndex;
    while (array.length > 0) {
      randomIndex = Math.floor(Math.random() * array.length);
      let randomElement = array[randomIndex];
      newArray.push(randomElement);
      array.splice(randomIndex, 1);
    }
    return newArray;
  };

  String.prototype.capitalize = function () {
    let newString = "",
      firstCharCap = this.charAt(0).toUpperCase();
    let remainingChar = this.slice(1);
    newString = `${firstCharCap}${remainingChar}`;
    return newString;
  };

  let capitalizeRandom = (arrayOfStrings) => {
    return arrayOfStrings.map((str) => {
      //chanves of x equal to 3 : 25%
      let x = Math.floor(Math.random() * 4);
      return x === 3 ? str.capitalize() : str;
    });
  };

  let addRandomPunctuation = (arrayOfStrings) => {
    return arrayOfStrings.map((str) => {
      let randomPunctuation,
        puncItems = [
          "?",
          ",",
          ",",
          ",",
          ".",
          ".",
          ".",
          "!",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          lineReturn,
        ],
        randomIndex = Math.floor(Math.random() * puncItems.length);
      randomPunctuation = puncItems[randomIndex];
      return `${str}${randomPunctuation}`;
    });
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
    //sets the total test time to x
    setTestTime: function (x) {
      appData.indicators.totaltestTime = x;
    },
    initializeTimeLeft: function () {
      appData.indicators.timeLeft = appData.indicators.totaltestTime;
    }, // initializes time left to the total test time
    startTest: function () {}, //starts the test
    endTest: function () {}, //ends the test
    getTimeLeft: function () {
      return appData.indicators.timeLeft;
    }, //return the remaining test time
    reduceTime: function () {}, //reduces the time by one second
    timeLeft: function () {}, //checks if there is time left to continue the test
    testEnded: function () {}, //checks if the test has already ended
    testStarted: function () {}, //checks if the test has started

    //results
    calculateWpm: function () {}, //calculates wpm and wpmChange and updates them in appData
    calculateCpm: function () {}, //calculates cpm and cpmChange and updates them in appData
    calculateAccurancy: function () {}, //calculates accurancy and accurancyChange and updates them in appData

    //test words
    //fills words.testWords
    fillListOfTestWords: function (textNumber, words) {
      let result = words.split(" ");
      if (textNumber === 0) {
        //shuffle the words and capitalize random strings and add random punctuation
        result = shuffle(result);
        result = capitalizeRandom(result);
        result = addRandomPunctuation(result);
      }
      appData.words.testWords = result;
    },
    //get list of test words: words.testWords
    getListOfTestWords: function () {
      return appData.words.testWords;
    },
    moveToNewWord: function () {}, // increments the currentWordIndex - updates the current word(appData.words.currentWord)
    //by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters
    updateCurrentWord: function (value) {}, // updates current word using user input
    getLineReturn: function () {
      return lineReturn;
    },
  };
})();
