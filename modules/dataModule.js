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
      currentWordIndex: -1,
      testWords: [],
      currentWord: {},
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
  class Word {
    constructor(index) {
      this.value = {
        correct: appData.words.testWords[index] + " ",
        user: "",
        isCorrect: false,
      };
      this.characters = {
        correct: this.value.correct.split(""),
        user: [],
        totalCorrect: 0,
        totalTest: this.value.correct.length,
      };
    }
  }

  //update method to update the words
  Word.prototype.update = function (value) {
    this.value.user = value;
    this.value.isCorrect = this.value.correct === this.value.user;
    this.characters.user = this.value.user.split("");
    //calculate the number of correct characters
    let numOfCorrectChar = 0;
    //calculate number of correct characters
    let charCallback = (currentElement, index) => {
      numOfCorrectChar +=
        currentElement === this.characters.user[index] ? 1 : 0;
    };
    this.characters.correct.forEach(charCallback);
    this.characters.totalCorrect = numOfCorrectChar;
  };

  return {
    //indicators - test Control
    //sets the total test time to x
    setTestTime: function (x) {
      appData.indicators.totaltestTime = x;
    },
    // initializes time left to the total test time
    initializeTimeLeft: function () {
      appData.indicators.timeLeft = appData.indicators.totaltestTime;
    },
    //starts the test
    startTest: function () {
      appData.indicators.testStarted = true;
    },
    endTest: function () {}, //ends the test
    getTimeLeft: function () {
      return appData.indicators.timeLeft;
    }, //return the remaining test time
    //reduces the time by one second
    reduceTime: function () {
      appData.indicators.timeLeft--;
      return appData.indicators.timeLeft;
    },
    //checks if there is time left to continue the test
    timeLeft: function () {
      return appData.indicators.timeLeft != 0;
    },
    //checks if the test has already ended
    testEnded: function () {
      return appData.indicators.testEnded;
    },
    //checks if the test has started
    testStarted: function () {
      return appData.indicators.testStarted;
    },

    //results
    //calculates wpm and wpmChange and updates them in appData
    calculateWpm: function () {
      let wpmOld = appData.results.wpm,
        numOfCorrectWords = appData.results.numOfCorrectWords,
        { timeLeft, totaltestTime } = appData.indicators;
      if (timeLeft !== totaltestTime) {
        appData.results.wpm = Math.round(
          (60 * numOfCorrectWords) / (totaltestTime - timeLeft)
        );
      } else {
        appData.results.wpm = 0;
      }
      appData.results.wpmChange = appData.results.wpm - wpmOld;
      return [appData.results.wpm, appData.results.wpmChange];
    },
    //calculates cpm and cpmChange and updates them in appData
    calculateCpm: function () {
      let cpmOld = appData.results.cpm,
        numOfCorrectCharacters = appData.results.numOfCorrectCharacters,
        { timeLeft, totaltestTime } = appData.indicators;
      if (timeLeft !== totaltestTime) {
        appData.results.cpm = Math.round(
          (60 * numOfCorrectCharacters) / (totaltestTime - timeLeft)
        );
      } else {
        appData.results.cpm = 0;
      }
      appData.results.cpmChange = appData.results.cpm - cpmOld;
      return [appData.results.cpm, appData.results.cpmChange];
    },
    //calculates accurancy and accurancyChange and updates them in appData
    calculateAccurancy: function () {
      let accurancyOld = appData.results.accurancy,
        numOfCorrectCharacters = appData.results.numOfCorrectCharacters,
        numOfTestCharacters = appData.results.numOfTestCharacters,
        { timeLeft, totaltestTime } = appData.indicators;
      if (timeLeft !== totaltestTime) {
        numOfTestCharacters != 0
          ? (appData.results.accurancy = Math.round(
              (100 * numOfCorrectCharacters) / numOfTestCharacters
            ))
          : (appData.results.accurancy = 0);
      } else {
        appData.results.accurancy = 0;
      }
      appData.results.accurancyChange =
        appData.results.accurancy - accurancyOld;
      return [appData.results.accurancy, appData.results.accurancyChange];
    },
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
    // increments the currentWordIndex - updates the current word(appData.words.currentWord)
    //by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters
    moveToNewWord: function () {
      if (appData.words.currentWordIndex > -1) {
        //in this case we should update number of correct words, number of correct characters and test characters
        appData.words.currentWord.value.isCorrect &&
          appData.results.numOfCorrectWords++;

        appData.results.numOfCorrectCharacters +=
          appData.words.currentWord.characters.totalCorrect;

        appData.results.numOfTestCharacters +=
          appData.words.currentWord.characters.totalTest;
      }
      appData.words.currentWordIndex++;
      let { currentWordIndex } = appData.words,
        newWord = new Word(currentWordIndex);
      appData.words.currentWord = newWord;
      console.log(appData);
    },
    getCurrentWordIndex: function () {
      return appData.words.currentWordIndex;
    },
    getCurrentWord: function () {
      let currentWord = appData.words.currentWord;
      return {
        value: {
          correct: currentWord.value.correct,
          user: currentWord.value.user,
        },
      };
    },
    // updates current word using user input
    updateCurrentWord: function (value) {
      appData.words.currentWord.update(value);
    },
    getLineReturn: function () {
      return lineReturn;
    },
  };
})();
