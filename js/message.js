'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var keyEscCloseHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_CODE) {
      closeMessage();
    }
  };

  var mouseCloseHandler = function (evt) {
    if (evt.button === window.util.LEFT_MOUSE_BUTTON) {
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
    }
    document.removeEventListener('keydown', keyEscCloseHandler);
  };

  var showSuccess = function () {
    showMessage(successMessageTemplate);
  };

  var showError = function (errorMessage) {
    showMessage(errorMessageTemplate);
    document.querySelector('.error__message').textContent = errorMessage;
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
