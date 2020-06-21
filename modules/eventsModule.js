//events module can access all the other modules directly

let eventsModule = (function (dModule, uModule, cModule, wModule) {
  let addEventListeners = function () {
    //character typing event listener
    //click on download button event listener
  };

  return {
    //init function , initialize the test before start
    init: function (duration, textNumber) {
      // STEPS :
      // add event listeners

      // fill the list of test words : in data module
      let words = wModule.getWords(textNumber);
      dModule.fillListOfTestWords(textNumber, words);

      let testWords = dModule.getListOfTestWords(),
        lineReturn = dModule.getLineReturn();
      // fill the list of test words : in ui module
      uModule.fillContent(testWords, lineReturn);

      // set the total time test
      dModule.setTestTime(duration);
      dModule.initializeTimeLeft();

      // update the time left : in data module
      let timeLeft = dModule.getTimeLeft();
      // update the time left : in ui module
      uModule.updateTimeLeft(timeLeft);

      // move to a new word : in data module
      dModule.moveToNewWord();

      // set active word : in ui module
      let index = dModule.getCurrentWordIndex();
      uModule.setActiveWord(index);
      // format the active module : in ui module
      let currentWord = dModule.getCurrentWord();
      uModule.formatWord(currentWord);

      // focus on text input : in ui module
      uModule.inputFocus();

      addEventListeners();
    },
  };
})(dataModule, uiModule, certificateModule, wordsModule);
