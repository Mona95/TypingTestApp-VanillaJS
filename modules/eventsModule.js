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

      //fill the list of test words : in data module
      //fill the list of test words : in ui module
      // set the total time test
      // update the time left : in data module
      // update the time left : in ui module
      //move to a new word : in data module
      // set active word : in ui module
      //format the active module : in ui module
      //focus on text input : in ui module
      //add event listeners

      addEventListeners();
    },
  };
})(dataModule, UIModule, certificateModule, wordsModule);
