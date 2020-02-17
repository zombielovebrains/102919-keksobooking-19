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
      x: window.util.randomInt(PIN_HALFWIDTH, MAX_X),
      y: window.util.randomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
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
        title: window.util.randomString(10),
        address: location.x + ', ' + location.y,
        price: window.util.randomInt(500, 1500),
        type: window.util.randomElement(FLAT_TYPE),
        rooms: window.util.randomInt(1, 5),
        quests: window.util.randomInt(1, 10),
        checkin: window.util.randomElement(CHECK_TIME),
        checkout: window.util.randomElement(CHECK_TIME),
        features: window.util.randomLengthArray(FEATURES),
        description: window.util.randomString(10),
        photos: window.util.randomLengthArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
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

  window.data = {
    item: createData,
    itemList: createDataList
  };
})();
