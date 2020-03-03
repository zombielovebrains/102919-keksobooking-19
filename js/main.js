'use strict';

(function () {
  var deactivatePage = function () {
    window.map.disable();
    window.form.disable();
    window.form.setAddress(window.map.getСoords());
  };

  var activatePage = function () {
    window.map.enable();
    window.form.enable();
    window.server.download(window.map.renderPins, unsuccessDownload);
    window.form.setAddress(window.map.getСoords());
  };

  var successSubmit = function () {
    deactivatePage();
    window.message.showSuccess();
  };

  var unsuccessSubmit = function (errorMessage) {
    window.message.showError(errorMessage);
  };

  var unsuccessDownload = function (errorMessage) {
    window.message.showError(errorMessage);
    deactivatePage();
  };

  deactivatePage();
  window.map.setAction(activatePage);
  window.form.setAction(successSubmit, unsuccessSubmit);
  window.form.setReset(deactivatePage);
})();
