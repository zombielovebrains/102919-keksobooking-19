'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var offerTypeMap = {
    'house': 'Дом',
    'palace': 'Дворец',
    'bungalo': 'Бунгало',
    'flat': 'Квартира'
  };
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  var getSuffix = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var createCard = function (data) { // Заполняем шаблон объявления данными из объекта
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + ' &#x20bd;' + '<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = offerTypeMap[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + getSuffix(parseInt(data.offer.rooms, 10), [' комната для ', ' комнаты для ', ' комнат для ']) + data.offer.guests + getSuffix(parseInt(data.offer.guests, 10), [' гостя', ' гостей', ' гостей']);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(generateFeatureFragment(data.offer.features));

    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(generatePhotoFragment(data.offer.photos));
    return cardElement;
  };

  window.createCard = createCard;
})();
