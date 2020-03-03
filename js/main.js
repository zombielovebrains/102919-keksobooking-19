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
    window.server.download(successDownload, unsuccessDownload);
    window.form.setAddress(window.map.getСoords());
  };

  var successSubmit = function () {
    deactivatePage();
    window.message.showSuccess();
  };

  var unsuccessSubmit = function (errorMessage) {
    window.message.showError(errorMessage);
  };

  var successDownload = function () {
    window.map.renderPins();
  };

  var unsuccessDownload = function (errorMessage) {
    window.message.showError(errorMessage);
    deactivatePage();
  };

  deactivatePage();
  window.map.setAction(activatePage);
  window.form.setSubmitAction(successSubmit, unsuccessSubmit);
  window.form.setResetAction(deactivatePage);
})();
