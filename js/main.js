(function () {
  var cards = window.dataList();

  var deactivatePage = function () {
    window.map.disableMap();
    window.form.disableForm();
    window.form.setAddress(window.map.getСoords());
  };

  var activatePage = function () {
    window.map.enableMap();
    window.form.enableForm();
    window.map.renderPins(cards);
    window.form.setAddress(window.map.getСoords());
  };

  deactivatePage();
  window.map.activate(activatePage);
})();
