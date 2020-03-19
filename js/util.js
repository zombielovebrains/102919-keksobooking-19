'use strict';

(function () {
  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var LEFT_MOUSE_BUTTON = 0;
  var INDEXES_FOR_LESS_THAN_HUNDRED = [2, 0, 1, 1, 1, 2];
  var NumberValue = {
    MIN_FOR_MORE_THAN_HUNDRED: 4,
    MAX_FOR_MORE_THAN_HUNDRED: 20,
    MAX_FOR_LESS_THAN_HUNDRED: 5
  };

  var changeDisabledAttribute = function (arr, flag) {
    arr.forEach(function (item) {
      item.disabled = flag;
    });
  };


  var getSuffix = function (number, titles) {
    var titleIndex = (number % 100 > NumberValue.MIN_FOR_MORE_THAN_HUNDRED && number % 100 < NumberValue.MAX_FOR_MORE_THAN_HUNDRED) ? 2 : INDEXES_FOR_LESS_THAN_HUNDRED[(number % 10 < NumberValue.MAX_FOR_MORE_THAN_HUNDRED) ? number % 10 : 5] ;
    return titles[titleIndex];
  };

  window.util = {
    changeDisabledAttribute: changeDisabledAttribute,
    getSuffix: getSuffix,
    ENTER_CODE: ENTER_CODE,
    ESC_CODE: ESC_CODE,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON
  };
})();
