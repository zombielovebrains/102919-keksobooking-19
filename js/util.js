'use strict';

(function () {
  var getRandomElement = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  var getRandomInt = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomString = function (count) { // Случайная строка заданной длины
    var text = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var createRandomLengthArray = function (arr) { // Массив рандомной длины с уникальными рандомными элментами
    var arrayLength = getRandomInt(1, arr.length);
    var randomArray = [];
    for (var i = 0; i < arrayLength; i++) {
      var element = getRandomElement(arr);
      if (randomArray.indexOf(element) === -1) {
        randomArray.push(element);
      }
    }
    return randomArray;
  };

  var changeDisabledAttribute = function (arr, flag) {
    arr.forEach(function (item) {
      item.disabled = flag;
    });
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomInt: getRandomInt,
    getRandomString: getRandomString,
    getRandomLengthArray: createRandomLengthArray,
    changeDisabledAttribute: changeDisabledAttribute
  };
})();
