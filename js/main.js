'use strict';

var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DATA_COUNT = 8;
var PIN_HALFWIDTH = 25;
var PIN_HEIGHT = 70;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var MAX_X = Math.floor(document.querySelector('.map').offsetWidth);
var LEFT_MOUSE_BUTTON = 0;
var ENTER_CODE = 13;
var ORIGINAL_MAIN_PIN_X = 601; // Значение .map__pin--main{left: 570px}  + половина ширины .map__pin--main img{width: 62/2 = 31}
var ORIGINAL_MAIN_PIN_Y = 406; // Значение .map__pin--main{top: 375px}  + половина высоты .map__pin--main{heigth: 62/2 = 31}
var MAIN_PIN_HALFWIDTH = 31;
var MAIN_PIN_HEIGTH = 84;

var similarPinList = document.querySelector('.map__pins');
var similarCardList = document.querySelector('.map');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mapFiltersForm = similarCardList.querySelector('.map__filters');
var mapFiltersElements = Array.from(mapFiltersForm.children);
var mapMainPin = similarPinList.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var titleField = adForm.querySelector('#title');
var priceField = adForm.querySelector('#price');

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


var createData = function (counter) { // Создаем объект с рандомными данными
  var location = {
    x: getRandomInt(PIN_HALFWIDTH, MAX_X),
    y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
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
  for (var i = 0; i < DATA_COUNT; i++) {
    var data = createData(i + 1);
    dataList.push(data);
  }
  return dataList;
};

var createPhotoElement = function (src) {
  var elem = document.createElement('img');
  elem.src = src;
  elem.classList.add('popup__photo');
  elem.alt = 'Фотография жилья';
  elem.width = PHOTO_WIDTH;
  elem.height = PHOTO_HEIGHT;
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

// var createCard = function (data) { // Заполняем шаблон объявления данными из объекта
//   var cardElement = similarCardTemplate.cloneNode(true);
//
//   cardElement.querySelector('.popup__avatar').src = data.author.avatar;
//   cardElement.querySelector('.popup__title').textContent = data.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
//   cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + ' &#x20bd;' + '<span>/ночь</span>';
//   cardElement.querySelector('.popup__type').textContent = data.offer.type;
//   cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.quests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
//
//   cardElement.querySelector('.popup__features').innerHTML = '';
//   cardElement.querySelector('.popup__features').appendChild(generateFeatureFragment(data.offer.features));
//
//   cardElement.querySelector('.popup__description').textContent = data.offer.description;
//
//   cardElement.querySelector('.popup__photos').innerHTML = '';
//   cardElement.querySelector('.popup__photos').appendChild(generatePhotoFragment(data.offer.photos));
//
//   return cardElement;
// };

var createPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = data.location.x + PIN_HALFWIDTH + 'px';
  pinElement.style.top = data.location.y + PIN_HEIGHT + 'px';
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

  similarPinList.appendChild(fragment);
};

// var renderCard = function (data) {
//   similarCardList.insertBefore(createCard(data), document.querySelector('.map__filters-container'));
// };

var changeDisabledAttribute = function (arr, flag) {
  if (flag) {
    arr.forEach(function (item) {
      item.disabled = true;
    });
  } else {
    arr.forEach(function (item) {
      item.disabled = false;
    });
  }
};

var activatePage = function () {
  adFormHeader.disabled = false;
  mapFiltersForm.disabled = false;
  changeDisabledAttribute(adFormElements, false);
  changeDisabledAttribute(mapFiltersElements, false);
  adForm.classList.remove('ad-form--disabled');
  similarCardList.classList.remove('map--faded');
  renderPins(cards);
  setAddress(getСoordinates());
};

var getСoordinates = function () {
  var pointX = Math.floor(parseInt(mapMainPin.style.left.replace('px', ''), 10) + MAIN_PIN_HALFWIDTH);
  var pointY = Math.floor(parseInt(mapMainPin.style.top.replace('px', ''), 10) + MAIN_PIN_HEIGTH);
  return [pointX, pointY];
};

var setAddress = function (arr) {
  addressField.value = arr[0] + ', ' + arr[1];
};

adFormHeader.disabled = true;
mapFiltersForm.disabled = true;
changeDisabledAttribute(adFormElements, true);
changeDisabledAttribute(mapFiltersElements, true);
addressField.readOnly = true;
addressField.value = ORIGINAL_MAIN_PIN_X + ', ' + ORIGINAL_MAIN_PIN_Y;

mapMainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage();
  }
});

mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    activatePage();
  }
});

var checkFieldsConstraints = function () {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('1 комната — «для 1 гостя»');
  } else if (roomNumber.value === '2' && (capacity.value !== '1' || capacity.value !== '2')) {
    capacity.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    capacity.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (roomNumber.value === '0' && capacity.value !== '0') {
    capacity.setCustomValidity('100 комнат — «не для гостей»');
  } else {
    capacity.setCustomValidity('');
  }
};

document.addEventListener('click', function () { // подразумевается, что я использую перехват события, что сразу получить значения roomNumber и capacity
  checkFieldsConstraints();
});

titleField.addEventListener('invalid', function () {
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Заголовок должно состоять минимум из 15 символов');
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity('Заголовок не должен превышать 50 символов');
  } else if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Обязательное поле');
  } else {
    titleField.setCustomValidity('');
  }
});

priceField.addEventListener('invalid', function () {
  if (priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity('Минимальная цена 1000');
  } else {
    priceField.setCustomValidity('');
  }
});
