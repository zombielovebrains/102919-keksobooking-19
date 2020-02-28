'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
