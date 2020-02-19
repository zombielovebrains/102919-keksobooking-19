'use strict';

(function () {
  var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;
  var MAX_X = Math.floor(document.querySelector('.map').offsetWidth) - PIN_HALFWIDTH;
  var DATA_COUNT = 8;

  var createData = function (counter) { // Создаем объект с рандомными данными
    var location = {
      x: window.util.getRandomInt(PIN_HALFWIDTH, MAX_X),
      y: window.util.getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
    };

    var data = {
      author: {
        avatar: 'img/avatars/user0' + counter + '.png'
      },

      location: {
        x: location.x,
        y: location.y
      },

      offer: {
        title: window.util.getRandomString(10),
        address: location.x + ', ' + location.y,
        price: window.util.getRandomInt(500, 1500),
        type: window.util.getRandomElement(FLAT_TYPE),
        rooms: window.util.getRandomInt(1, 5),
        quests: window.util.getRandomInt(1, 10),
        checkin: window.util.getRandomElement(CHECK_TIME),
        checkout: window.util.getRandomElement(CHECK_TIME),
        features: window.util.getRandomLengthArray(FEATURES),
        description: window.util.getRandomString(10),
        photos: window.util.getRandomLengthArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
      }
    };
    return data;
  };

  var createDataList = function () { // Заполняем массив объектами
    var dataList = [];
    for (var i = 0; i < DATA_COUNT; i++) {
      var data = createData(i + 1);
      dataList.push(data);
    }
    return dataList;
  };

  window.dataList = createDataList;
})();
