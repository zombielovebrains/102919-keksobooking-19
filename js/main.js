'use strict';

var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DATA_COUNT = 8;
var PIN_HALFWIDTH = 31;
var PIN_HEIGHT = 70;

var similarListElement = document.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
document.querySelector('.map').classList.remove('map--faded');

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomString = function (count) { // Случайная строка заданной длины
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < count; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var createRandomLengthArray = function (arr) { // Массив рандомной длины с уникальными рандомными элментами
  var arrayLength = getRandomInt(1, arr.length);
  var randomArray = [];
  for (var i = 0; i < arrayLength; i++) {
    var element = getRandomElement(arr);
    if (randomArray.indexOf(element) === -1) {
      randomArray.push(element);
    }
  }
  return randomArray;
};


var createData = function (counter, maxWidth) { // Создаем объект с рандомными данными
  var location = {
    x: getRandomInt(62, maxWidth),
    y: getRandomInt(130, 630)
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
      title: getRandomString(10),
      address: location.x + ', ' + location.y,
      price: getRandomInt(500, 1500),
      type: getRandomElement(FLAT_TYPE),
      rooms: getRandomInt(1, 5),
      quests: getRandomInt(1, 10),
      checkin: getRandomElement(CHECK_TIME),
      checkout: getRandomElement(CHECK_TIME),
      features: createRandomLengthArray(FEATURES),
      description: getRandomString(10),
      photos: createRandomLengthArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
    }
  };
  return data;
};


var createDataList = function () { // Заполняем массив объектами
  var dataList = [];
  var maxWidth = Math.floor(document.querySelector('.map').offsetWidth);

  for (var i = 0; i < DATA_COUNT; i++) {
    var data = createData(i + 1, maxWidth);
    dataList.push(data);
  }
  return dataList;
};

var createPhotoElement = function (src) {
  var elem = document.createElement('img');
  elem.src = src;
  elem.classList.add('popup__photo');
  elem.alt = 'Фотография жилья';
  elem.width = '45';
  elem.height = '40';
  return elem;
};

var generatePhotoFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoElement(photos[i]));
  }
  return fragment;
};

var createFeatureElement = function (feature) {
  var elem = document.createElement('li');
  elem.classList.add('popup__feature');
  elem.classList.add('popup__feature--' + feature);
  return elem;
};

var generateFeatureFragment = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    fragment.appendChild(createFeatureElement(features[i]));
  }
  return fragment;
};

var createCard = function (data) { // Заполняем шаблон объявления данными из объекта
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').innerHtml = data.offer.price + '&#x20bd;' + '<span>ночь</span>';
  cardElement.querySelector('.popup__type').textContent = data.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.quests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(generateFeatureFragment(data.offer.features));

  cardElement.querySelector('.popup__description').textContent = data.offer.description;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(generatePhotoFragment(data.offer.photos));

  return cardElement;
};

var createPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = data.location.x - PIN_HALFWIDTH + 'px';
  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  return pinElement;
};

var cards = createDataList();

var renderPins = function (dataList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < dataList.length; i++) {
    fragment.appendChild(createPin(dataList[i]));
  }

  similarListElement.appendChild(fragment);
};

var renderCard = function (data) {
  similarListElement.appendChild(createCard(data));
};

renderPins(cards);
