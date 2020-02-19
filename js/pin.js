'use strict';

(function () {
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = data.location.x + PIN_HALFWIDTH + 'px';
    pinElement.style.top = data.location.y + PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    return pinElement;
  };

  window.pin = createPin;
})();
