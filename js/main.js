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
    window.server.download(window.map.renderPins);
    window.form.setAddress(window.map.getСoords());
  };

  var successSubmit = function () {
    window.map.deletePins();
    window.map.closeCard();
    window.map.disable();
    deactivatePage();
    window.form.reset();
  };

  var unsuccessSubmit = function () {
    window.form.showError();
  };

  deactivatePage();
  window.map.setAction(activatePage);
  window.form.setAction(successSubmit, unsuccessSubmit);
})();
