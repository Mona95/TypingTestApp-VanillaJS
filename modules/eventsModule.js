//events module can access all the other modules directly
let eventsModule = (function (dModule, uModule, cModule, wModule) {
  let addEventListeners = function () {
    //character typing event listener
    //click on download button event listener
  };

  return {
    //init function , initialize the test before start
    init: function (duration, textNumber) {
      addEventListeners();
    },
  };
})(dataModule, UIModule, certificateModule, wordsModule);
