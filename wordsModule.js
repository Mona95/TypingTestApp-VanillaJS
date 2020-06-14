let wordsModule = (function () {
  const words = [
    "word1 word2 word3 etc",
    "word1 word2 word3 etc",
    "word1 word2 word3 etc",
  ];

  return {
    getWords: function (textNumber) {
      return words[textNumber];
    },
  };
})();
