'use strict';

(function () {
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarPinList = document.querySelector('.map__pins');

  var createPin = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = data.location.x + PIN_HALFWIDTH + 'px';
    pinElement.style.top = data.location.y + PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    return pinElement;
  };

  var renderPins = function (dataList) {
    var fragment = document.createDocumentFragment();
    dataList.forEach(function (item) {
      var pin = createPin(item);
      var data = item;
      fragment.appendChild(pin);

      pin.addEventListener('click', function () {
        window.card.render(data);
      });
    });
    similarPinList.appendChild(fragment);
  };

  window.pin = {
    render: renderPins
  };
})();
