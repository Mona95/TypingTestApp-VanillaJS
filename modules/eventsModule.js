//events module can access all the other modules directly

let eventsModule = (function (dModule, uModule, cModule, wModule) {
  let addEventListeners = function () {
    //fake event for enter
    uModule.getDOMElements().textInput.addEventListener("keydown", (event) => {
      //if the test ended , do nothing
      if (dModule.testEnded()) {
        return;
      }
      //check if the user pressed Enter
      var key = event.keyCode;
      if (key === 13) {
        uModule.getDOMElements().textInput.value += `${dModule.getLineReturn()} `;

        //create a new 'input' event
        let inputEvent = new Event("input");
        //dispatch new event
        uModule.getDOMElements().textInput.dispatchEvent(inputEvent);
      }
    });

    //character typing event listener
    uModule.getDOMElements().textInput.addEventListener("input", (event) => {
      //if the test ended , do nothing
      if (dModule.testEnded()) {
        return;
      }
      //if the test has not started yet ,start the test and countdown
      if (!dModule.testStarted()) {
        var results = {};
        //start the test
        dModule.startTest();
        //start a counter
        let counter = setInterval(function () {
          //calculate the results
          //update wpm,wpmChange;
          [results.wpm, results.wpmChange] = dModule.calculateWpm();
          //update cpm, cpmChange
          [results.cpm, results.cpmChange] = dModule.calculateCpm();
          //update accurancy, accurancyChange
          [
            results.accurancy,
            results.accurancyChange,
          ] = dModule.calculateAccurancy();
          //update results(in UI module)
          if (dModule.timeLeft()) {
            //update time left
            let timeLeft = dModule.reduceTime();
            uModule.updateTimeLeft(timeLeft);
          }
        }, 1000);
      }
      //get typed word
      let typedWord = uModule.getTypedWord();
      //update current word
      dModule.updateCurrentWord(typedWord);

      //format current word
      let currentWord = dModule.getCurrentWord();
      uModule.formatWord(currentWord);

      //check if user pressed space or enter
      if (
        uModule.spacePressed(event) ||
        uModule.enterPressed(dModule.getLineReturn())
      ) {
        //empty text input
        uModule.emptyInput();
        //deactivate current word
        uModule.deactivateCurrentWord();

        // move to a new word : in data module
        dModule.moveToNewWord();

        // set active word : in ui module
        let index = dModule.getCurrentWordIndex();
        uModule.setActiveWord(index);
        // format the active module : in ui module
        let currentWord = dModule.getCurrentWord();
        uModule.formatWord(currentWord);

        uModule.scroll();
      }
    });

    //click on download button event listener
  };
  //scroll active word into middle view on window resize.
  window.addEventListener("resize", uModule.scroll);

  return {
    //init function , initialize the test before start
    init: function (duration, textNumber) {
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

      // add event listeners
      addEventListeners();
    },
  };
})(dataModule, uiModule, certificateModule, wordsModule);
