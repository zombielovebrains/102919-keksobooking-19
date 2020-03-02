'use strict';

(function () {
  var ESC_CODE = 27;
  var LEFT_MOUSE_BUTTON = 0;

  var keyEscCloseHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeMessage();
    }
  };

  var mouseCloseHandler = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      closeMessage();
    }
  };

  var showMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', messageElement);

    messageElement.addEventListener('mousedown', mouseCloseHandler);

    if (document.querySelector('.error__button')) {
      document.querySelector('.error__button').addEventListener('click', mouseCloseHandler);
    }

    document.addEventListener('keydown', keyEscCloseHandler);
  };

  var closeMessage = function () {
    if (document.querySelector('.success')) {
      document.body.removeChild(document.querySelector('.success'));
    } else if (document.querySelector('.error')) {
      document.body.removeChild(document.querySelector('.error'));
      document.querySelector('.error__button').removeEventListener('click', mouseCloseHandler);
    }
    document.removeEventListener('keydown', keyEscCloseHandler);
  };

  window.message = {
    show: showMessage
  };
})();
