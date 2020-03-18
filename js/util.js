'use strict';

(function () {
  var changeDisabledAttribute = function (arr, flag) {
    arr.forEach(function (item) {
      item.disabled = flag;
    });
  };

  window.changeDisabledAttribute = changeDisabledAttribute;
})();
