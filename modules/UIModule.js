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
    accurancyChange: document.getElementById("accurancyChange"),
    //user input
    textInput: document.querySelector("#input"),
    nameInput: document.querySelector(".form-group"),
    nameField: document.getElementById("name"),
    //test words
    content: document.getElementById("content"),
    activeWord: "",
    //modal
    modal: $("#finishedModal"),
    downloadBtn: document.getElementById("download"),
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

  let updateChanges = (value, changeElement) => {
    //determine the class to add to the change element
    let classToAdd, html;
    [classToAdd, html] =
      value >= 0 ? ["scoreUp", `+${value}`] : ["scoreDown", `${value}`];
    //add % to the percentage change
    if (changeElement === DOMElements.accurancyChange) {
      html += "%";
    }
    //update the change element
    changeElement.innerHTML = html;
    //style the change element
    changeElement.removeAttribute("class");
    changeElement.className = classToAdd;

    //fade element
    fadeElement(changeElement);
  };

  let fadeElement = (element) => {
    element.style.opacity = 1;
    setTimeout(function () {
      element.style.opacity = 0.9;
    }, 1000);
  };

  return {
    //get DOM elements
    getDOMElements: function () {
      return {
        textInput: DOMElements.textInput,
        nameField: DOMElements.nameField,
        download: DOMElements.downloadBtn,
      };
    },

    //indicators - Test Control
    updateTimeLeft: function (timeLeft) {
      DOMElements.timeLeft.innerHTML = timeLeft;
    },

    //results
    updateResults: function (results) {
      let {
        wpm,
        wpmChange,
        cpm,
        cpmChange,
        accurancy,
        accurancyChange,
      } = results;
      DOMElements.wpm.innerHTML = wpm;
      DOMElements.cpm.innerHTML = cpm;
      DOMElements.accurancy.innerHTML = `${accurancy}%`;
      //update changes
      updateChanges(wpmChange, DOMElements.wpmChange);
      updateChanges(cpmChange, DOMElements.cpmChange);
      updateChanges(accurancyChange, DOMElements.accurancyChange);
    },
    fillModal: function (wpm) {
      let results;
      switch (true) {
        case wpm < 40:
          results = {
            type: "turtle",
            level: "Beginner",
          };
          break;
        case wpm < 70:
          results = {
            type: "horse",
            level: "Average",
          };
          break;
        case wpm > 70:
          results = {
            type: "puma",
            level: "Expert",
          };
          break;
        default:
          break;
      }
      let htmlTpl =
        "<div><p>You are a %type% !</p>You type at a speed of %wpm% per minute!<p></p></div>";

      htmlTpl = htmlTpl.replace("%type%", results.type);
      htmlTpl = htmlTpl.replace("%wpm%", wpm);

      //insert htmlTpl before nameInput of modal
      DOMElements.nameInput.insertAdjacentHTML("beforebegin", htmlTpl);

      //store level in download button
      DOMElements.downloadBtn.setAttribute("level", results.level);
    },
    showModal: function () {
      DOMElements.modal.modal("show");
    },

    //user input
    inputFocus: function () {
      DOMElements.textInput.focus();
    },
    isNameEmpty: function () {
      return DOMElements.nameField.value === "";
    },
    flagNameInput: function () {
      DOMElements.nameField.style.borderColor = "red";
    },
    spacePressed: function (event) {
      return event.data === " ";
    },
    enterPressed: function (lineReturn) {
      return this.getTypedWord().includes(`${lineReturn} `);
    },
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
