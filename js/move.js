
(function () {
  'use strict';
  var MIN_X = -window.map.MAIN_PIN_HALFWIDTH;
  var MAX_X = Math.floor(document.querySelector('.map__pins').offsetWidth) - window.map.MAIN_PIN_HALFWIDTH;
  var MIN_Y = 130 - window.map.MAIN_PIN_HEIGHT;
  var MAX_Y = 630 - window.map.MAIN_PIN_HEIGHT;
  var mapMainPin = window.map.mainPin;

  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === window.util.LEFT_MOUSE_BUTTON) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newPositions = {
          x: mapMainPin.offsetLeft - shift.x,
          y: mapMainPin.offsetTop - shift.y
        };

        if (newPositions.y > MAX_Y) {
          mapMainPin.style.top = MAX_Y + 'px';
        } else if (newPositions.y < MIN_Y) {
          mapMainPin.style.top = MIN_Y + 'px';
        } else {
          mapMainPin.style.top = newPositions.y + 'px';
        }

        if (newPositions.x > MAX_X) {
          mapMainPin.style.left = MAX_X + 'px';
        } else if (newPositions.x < MIN_X) {
          mapMainPin.style.left = MIN_X;
        } else {
          mapMainPin.style.left = newPositions.x + 'px';
        }

        window.form.setAddress(window.map.getCoords());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.setAddress(window.map.getCoords());
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
