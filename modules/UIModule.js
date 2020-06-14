let uiModule = (function () {
  //classes used to select HTML Elements
  let DOMElements = {
    //indicators - test control
    //timeLeft, //HTML element displaying time left
    //test results
    //wpm,
    //wpmChange,
    //cpm,
    //cpmChange,
    //accurancy,
    //accurancyChange,
    //user input
    //textInput,
    //nameInput,
    //test words
    //content,
    //activeWord,
    //modal
    //modal,
  };

  return {
    //get DOM elements
    getDOMElements: function () {},

    //indicators - Test Control
    updateTimeLeft: function () {},

    //results
    updateResults: function () {},
    fillModal: function () {},
    showModal: function () {},

    //user input
    inputFocus: function () {},
    isNameEmpty: function () {},
    flagNameInput: function () {},
    spacePressed: function () {},
    enterPressed: function () {},
    emptyInput: function () {},
    getTypedWord: function () {},

    //test words
    fillContent: function () {},
    formatWord: function (wordObject, wordHTML) {},
    setActiveWord: function (index) {},
    deactivateCurrentWord: function () {},
    scroll: function () {},
  };
})();
