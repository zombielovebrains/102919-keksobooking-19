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
    window.download(window.map.renderPins);
    window.form.setAddress(window.map.getСoords());
  };

  deactivatePage();
  window.map.setAction(activatePage);

  window.deactivatePage = deactivatePage;
})();
