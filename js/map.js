'use strict';

(function () {
  var DISABLED_MAIN_PIN_HEIGTH = 31;
  var MAIN_PIN_HALFWIDTH = 31;
  var MAIN_PIN_HEIGTH = 84;
  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var LEFT_MOUSE_BUTTON = 0;
  var similarCardList = document.querySelector('.map');
  var similarPinList = document.querySelector('.map__pins');
  var mapFiltersForm = similarCardList.querySelector('.map__filters');
  var mapFiltersElements = Array.from(mapFiltersForm.children);
  var mapMainPin = document.querySelector('.map__pin--main');


  var keyEscCloseHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    similarCardList.querySelector('.map__card').remove();
    document.removeEventListener('keydown', keyEscCloseHandler);
  };

  var renderCard = function (data) {
    var card = window.card(data);
    var openedCard = similarCardList.querySelector('.map__card');

    if (openedCard !== null) {
      openedCard.remove();
    }
    similarCardList.insertBefore(card, document.querySelector('.map__filters-container'));

    document.addEventListener('keydown', keyEscCloseHandler);

    card.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
  };

  var renderPins = function (dataList) {
    var fragment = document.createDocumentFragment();
    dataList.forEach(function (item) {
      var pin = window.pin(item);
      var data = item;
      fragment.appendChild(pin);

      pin.addEventListener('click', function () {
        renderCard(data);
      });
    });
    similarPinList.appendChild(fragment);
  };

  var getСoordinates = function () {
    var pointX = Math.floor(parseInt(mapMainPin.style.left, 10) + MAIN_PIN_HALFWIDTH);
    var pointY;
    if (similarCardList.classList.contains('map--faded')) {
      pointY = Math.floor(parseInt(mapMainPin.style.top, 10) + DISABLED_MAIN_PIN_HEIGTH);
    } else {
      pointY = Math.floor(parseInt(mapMainPin.style.top, 10) + MAIN_PIN_HEIGTH);
    }
    return [pointX, pointY];
  };

  var disableMap = function () {
    window.util.changeDisabledAttribute(mapFiltersElements, true);
  };

  var enableMap = function () {
    window.util.changeDisabledAttribute(mapFiltersElements, false);
    similarCardList.classList.remove('map--faded');
  };

  var activate = function (instruction) {

    mapMainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        instruction();
      }
    });

    mapMainPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_CODE) {
        instruction();
      }
    });
  };

  window.map = {
    disableMap: disableMap,
    enableMap: enableMap,
    getСoords: getСoordinates,
    renderPins: renderPins,
    activate: activate
  };
})();
