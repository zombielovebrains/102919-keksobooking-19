'use strict';

(function () {
  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var LEFT_MOUSE_BUTTON = 0;

  var changeDisabledAttribute = function (arr, flag) {
    arr.forEach(function (item) {
      item.disabled = flag;
    });
  };

  window.util = {
    changeDisabledAttribute: changeDisabledAttribute,
    ENTER_CODE: ENTER_CODE,
    ESC_CODE: ESC_CODE,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON
  };
})();
