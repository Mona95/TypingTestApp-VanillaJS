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
    getDOMElements: function () {
      return {
        textInput: DOMElements.textInput,
      };
    },

    //indicators - Test Control
    updateTimeLeft: function (timeLeft) {
      DOMElements.timeLeft.innerHTML = timeLeft;
    },

    //results
    updateResults: function () {},
    fillModal: function () {},
    showModal: function () {},

    //user input
    inputFocus: function () {
      DOMElements.textInput.focus();
    },
    isNameEmpty: function () {},
    flagNameInput: function () {},
    spacePressed: function (event) {
      return event.data === " ";
    },
    enterPressed: function () {},
    emptyInput: function () {
      DOMElements.textInput.value = "";
    },
    getTypedWord: function () {
      return DOMElements.textInput.value;
    },

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
    },
    formatWord: function (wordObject) {
      let activeWord = DOMElements.activeWord;
      //highlight current word
      activeWord.className = "activeWord";

      //format individual characters
      let correctValue = wordObject.value.correct,
        userValue = wordObject.value.user;
      const returnCharClass = (currentChar, index) => {
        return index < userValue.length
          ? currentChar == userValue[index]
            ? "correctChar"
            : "wrongChar"
          : "0";
      };
      let classes = Array.prototype.map.call(correctValue, returnCharClass);
      //get activeWord children tags
      let characters = activeWord.children;
      //add classes to children
      for (let i = 0; i < characters.length; i++) {
        characters[i].removeAttribute("class");
        characters[i].className = classes[i];
      }
    },
    setActiveWord: function (index) {
      DOMElements.activeWord = DOMElements.content.children[index];
    },
    deactivateCurrentWord: function () {
      DOMElements.activeWord.removeAttribute("class");
    },
    scroll: function () {
      let activeWord = DOMElements.activeWord,
        top1 = activeWord.offsetTop,
        top2 = DOMElements.content.offsetTop,
        diff = top1 - top2;
      DOMElements.content.scrollTop = diff - 60; // because we want to scroll to middle and the height of contyent is 180px
    },
  };
})();
