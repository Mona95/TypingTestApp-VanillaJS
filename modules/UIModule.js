let uiModule = (function () {
  //classes used to select HTML Elements
  let DOMElements = {
    //indicators - test control
    timeLeft: document.getElementById("timeLeft"), //HTML element displaying time left
    //test results
    wpm: document.getElementById("wpm"),
    wpmChange: document.getElementById("wpmChange"),
    cpm: document.getElementById("cpm"),
    cpmChange: document.getElementById("cpmChange"),
    accurancy: document.getElementById("accurancy"),
    accurancyChange: document.getElementById("acuurancyChange"),
    //user input
    textInput: document.querySelector("#input"),
    nameInput: document.querySelector(".form-group"),
    //test words
    content: document.getElementById("content"),
    activeWord: "",
    //modal
    modal: $("#myModal"),
  };

  let splitArray = (str) => {
    return str.split("");
  };

  let addSpace = (array) => {
    array.push(" ");
    return array;
  };

  let addSpanTags = (array) => {
    return array.map((currentChar) => {
      return `<span>${currentChar}</span>`;
    });
  };

  let addWordsSpanTags = (array) => {
    array.push("</span>");
    array.unshift("<span>");
    return array;
  };

  let joinEachWords = (array) => {
    return array.join("");
  };

  return {
    //get DOM elements
    getDOMElements: function () {},

    //indicators - Test Control
    updateTimeLeft: function (timeLeft) {
      DOMElements.timeLeft.innerHTML = timeLeft;
    },

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
    fillContent: function (array, lineReturn) {
      //modifying array of words
      let content = array.map(splitArray);
      content = content.map(addSpace);
      content = content.map(addSpanTags);
      content = content.map(addWordsSpanTags);
      //creating the strings after modifications
      content = content.map(joinEachWords);
      content = content.join("");
      content = content
        .split(`<span>${lineReturn}</span>`)
        .join("<span>&#8629;</span>");
      //set string into dom elements
      DOMElements.content.innerHTML = content;
      console.log(content);
    },
    formatWord: function (wordObject, wordHTML) {},
    setActiveWord: function (index) {},
    deactivateCurrentWord: function () {},
    scroll: function () {},
  };
})();
