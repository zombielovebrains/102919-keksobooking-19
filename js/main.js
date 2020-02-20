(function () {
  var cards = window.dataList();

  var deactivatePage = function () {
    window.map.disable();
    window.form.disable();
    window.form.setAddress(window.map.getСoords());
  };

  var activatePage = function () {
    window.map.enable();
    window.form.enable();
    window.map.renderPins(cards);
    window.form.setAddress(window.map.getСoords());
  };

  deactivatePage();
  window.map.setAction(activatePage);
})();
