'use strict';

(function () {
  var DISABLED_MAIN_PIN_HEIGTH = 31;
  var MAIN_PIN_HALFWIDTH = 33;
  var MAIN_PIN_HEIGTH = 84;
  var MAIN_PIN_ORIGINAL_LEFT = '570px';
  var MAIN_PIN_ORIGINAL_TOP = '375px';
  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var LEFT_MOUSE_BUTTON = 0;
  var similarCardList = document.querySelector('.map');
  var similarPinList = document.querySelector('.map__pins');
  var mapFiltersForm = similarCardList.querySelector('.map__filters');
  var mapFiltersElements = Array.from(mapFiltersForm.children);
  var mapMainPin = document.querySelector('.map__pin--main');

  var resetMainPinStyles = function () {
    mapMainPin.style.left = MAIN_PIN_ORIGINAL_LEFT;
    mapMainPin.style.top = MAIN_PIN_ORIGINAL_TOP;
  };

  var keyEscCloseHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    if (similarCardList.querySelector('.map__card')) {
      removePinActiveClass();
      similarCardList.querySelector('.map__card').remove();
    }
    document.removeEventListener('keydown', keyEscCloseHandler);
  };

  var renderCard = function (data) {
    var card = window.createCard(data);
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
    closeCard();
    deletePins();
    dataList.forEach(function (item) {
      var pin = window.createPin(item);
      var data = item;
      fragment.appendChild(pin);

      pin.addEventListener('click', function () {
        removePinActiveClass();
        pin.classList.add('map__pin--active');
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
    window.changeDisabledAttribute(mapFiltersElements, true);
    similarCardList.classList.add('map--faded');
    closeCard();
    deletePins();
    resetMainPinStyles();
  };

  var enableMap = function () {
    window.changeDisabledAttribute(mapFiltersElements, false);
    similarCardList.classList.remove('map--faded');
  };

  var setAction = function (callback) {

    mapMainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        callback();
      }
    });

    mapMainPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_CODE) {
        callback();
      }
    });
  };

  var deletePins = function () {
    var pins = similarCardList.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        similarPinList.removeChild(item);
      }
    });
  };

  var removePinActiveClass = function () {
    if (similarCardList.querySelector('.map__pin--active')) {
      similarCardList.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  window.map = {
    disable: disableMap,
    enable: enableMap,
    getСoords: getСoordinates,
    renderPins: renderPins,
    setAction: setAction,
    mainPin: mapMainPin,
    resetMainPinStyles: resetMainPinStyles
  };
})();
