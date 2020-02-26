'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  // var StatusCode = {
  //   OK: 200
  // };
  // var TIMEOUT_IN_MS = 10000;

  window.download = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    // xhr.addEventListener('error', function () {
    //   onError('Произошла ошибка соединения');
    // });
    //
    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });
    //
    // xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
