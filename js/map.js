(function () {
  var DISABLED_MAIN_PIN_HEIGTH = 31;
  var MAIN_PIN_HALFWIDTH = 31;
  var MAIN_PIN_HEIGTH = 84;
  var ENTER_CODE = 13;
  var LEFT_MOUSE_BUTTON = 0;
  var cards = window.data.itemList();
  var similarCardList = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var mapFiltersForm = similarCardList.querySelector('.map__filters');
  var mapFiltersElements = Array.from(mapFiltersForm.children);
  var mapMainPin = document.querySelector('.map__pin--main');
  var addressField = adForm.querySelector('#address');

  var getСoordinates = function () {
    var pointX = Math.floor(parseInt(mapMainPin.style.left, 10) + MAIN_PIN_HALFWIDTH);
    var pointY;
    if (adForm.classList.contains('ad-form--disabled')) {
      pointY = Math.floor(parseInt(mapMainPin.style.top, 10) + DISABLED_MAIN_PIN_HEIGTH);
    } else {
      pointY = Math.floor(parseInt(mapMainPin.style.top, 10) + MAIN_PIN_HEIGTH);
    }
    return [pointX, pointY];
  };

  var setAddress = function (arr) {
    addressField.value = arr[0] + ', ' + arr[1];
  };

  var deactivatePage = function () {
    window.util.disabledAttribute(adFormElements, true);
    window.util.disabledAttribute(mapFiltersElements, true);
    setAddress(getСoordinates());
  };

  var activatePage = function () {
    window.util.disabledAttribute(adFormElements, false);
    window.util.disabledAttribute(mapFiltersElements, false);
    adForm.classList.remove('ad-form--disabled');
    similarCardList.classList.remove('map--faded');
    window.pin.render(cards);
    setAddress(getСoordinates());
  };

  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      activatePage();
    }
  });

  deactivatePage();
})();
