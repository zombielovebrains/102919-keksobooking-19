(function () {
  'use strict';
  var ads;
  var deactivatePage = function () {
    window.map.disable();
    window.form.disable();
    window.form.setAddress(window.map.getCoords());
  };

  var activatePage = function () {
    window.server.download(successDownload, unsuccessDownload);
    window.map.enable();
    window.form.enable();
    window.form.setAddress(window.map.getCoords());
  };

  var filterChangeHandler = window.debounce(function () {
    window.map.renderPins(window.filter.check(ads));
  });

  var successSubmit = function () {
    deactivatePage();
    window.deleteAllPhotos();
    window.message.showSuccess();
  };

  var unsuccessSubmit = function (errorMessage) {
    window.message.showError(errorMessage);
  };

  var successDownload = function (data) {
    ads = Array.from(data);
    window.map.renderPins(window.filter.check(ads));
    window.filter.set(filterChangeHandler);
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
