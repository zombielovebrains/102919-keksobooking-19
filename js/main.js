'use strict';

var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var DATA_COUNT = 8;
var PIN_HALFWIDTH = 36;
var PIN_HEIGHT = 84;

var similarListElement = document.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
document.querySelector('.map').classList.remove('map--faded');

var getRandomIndex = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return index;
};

var getRandomInt = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomString = function (count) { // Случайная строка заданной длины
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  for( var i=0; i < count; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var createRandomLengthArray = function (arr) { // Массив рандомной длины с уникальными рандомными элментами
  var arrayLength = getRandomInt(1, arr.length);
  var randomArray = [];
  for (var i = 0; i < arrayLength; i++) {
    var element = arr[getRandomIndex(arr)];
    if (randomArray.indexOf(element) === -1) {
      randomArray.push(element);
    }
  }
  return randomArray;
};

var createDataObject = function (counter, maxWidth) { // Создаем объект с рандомными данными
  var dataObject = {
    'author': {
      'avatar': 'img/avatars/user0' + counter + '.png'
    },

    'offer': {
      'title': getRandomString(10),
      'address': getRandomInt(0, 600) + ', ' + getRandomInt(0, 600),
      'price': getRandomInt(500, 1500),
      'type': FLAT_TYPE[getRandomIndex(FLAT_TYPE)],
      'rooms': getRandomInt(1, 5),
      'quests': getRandomInt(1, 10),
      "checkin": CHECK_TIME[getRandomIndex(CHECK_TIME)],
      "checkout": CHECK_TIME[getRandomIndex(CHECK_TIME)],
      "features": createRandomLengthArray(FEATURES),
      "description": getRandomString(10),
      "photos": createRandomLengthArray(["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"])
    },

    "location": {
      "x": getRandomInt(62, maxWidth),
      "y": getRandomInt(130, 630)
    }
  }
  return dataObject;
};

var createDataObjectList = function () { // Заполняем массив объектами
  var dataList = [];
  var maxWidth = Math.floor(document.querySelector('.map').offsetWidth);

  for (var i = 0; i < DATA_COUNT; i++) {
    var dataObject = createDataObject(i + 1, maxWidth);
    dataList.push(dataObject);
  }
  return dataList;
};

var generatePhotoFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var elem = document.createElement('img');
    elem.src = photos[i];
    elem.classList.add('popup__photo');
    elem.alt = 'Фотография жилья';
    elem.width = '45';
    elem.height = '40';
    fragment.appendChild(elem);
  }
  return fragment;
};

var renderCard = function (card) { // Заполняем шаблон объявления данными из объекта
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').innerHtml = card.offer.price + '&#x20bd;' + '<span>ночь</span>';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.quests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  for (var i = 0; i < FEATURES.length; i++) { // в цикле скрываю преимущества
    if (card.offer.features.indexOf(FEATURES[i]) === -1) {
      var className = '.popup__feature--' + FEATURES[i];
      cardElement.querySelector(className).classList.add('visually-hidden');
    }
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  cardElement.querySelector('.popup__photos').appendChild(generatePhotoFragment(card.offer.photos));
  var photoTemplate = cardElement.querySelector('.popup__photo:first-child'); // ищу шаблон с пустым src
  cardElement.querySelector('.popup__photos').removeChild(photoTemplate); // удаляю шаблон

  return cardElement;
};

var renderPin = function (card) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = card.location.x - PIN_HALFWIDTH + 'px';
  pinElement.style.top = card.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.offer.title;

  return pinElement;
};

var generateCardFragment = function () { // Заполняем 8 шаблонов данными
  var fragment = document.createDocumentFragment();
  var cards = createDataObjectList();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(renderPin(cards[i]));
    fragment.appendChild(renderCard(cards[i]));
  }
  return fragment;
};

similarListElement.appendChild(generateCardFragment());
