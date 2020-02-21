(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var MAIN_PIN_HALFWIDTH = 33;
  var MAX_X = Math.floor(document.querySelector('.map__pins').offsetWidth) - MAIN_PIN_HALFWIDTH;
  var mapMainPin = document.querySelector('.map__pin--main');

  mapMainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
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

        if (mapMainPin.offsetTop > window.data.MAX_Y) {
          mapMainPin.style.top = window.data.MAX_Y + 'px';
        } else if (mapMainPin.offsetTop < window.data.MIN_Y) {
          mapMainPin.style.top = window.data.MIN_Y + 'px';
        }
        if (mapMainPin.offsetLeft > MAX_X) {
          mapMainPin.style.left = MAX_X + 'px';
        } else if (mapMainPin.offsetLeft < 0) {
          mapMainPin.style.left = 0;
        }


        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
        window.form.setAddress(window.map.getСoords());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.setAddress(window.map.getСoords());
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
