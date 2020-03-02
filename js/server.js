'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var download = function (onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = createRequest(onSuccess);
    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.server = {
    upload: upload,
    download: download
  };
})();
