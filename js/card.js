
(function () {
  'use strict';
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var offerTypeMap = {
    house: 'Дом',
    palace: 'Дворец',
    bungalo: 'Бунгало',
    flat: 'Квартира'
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
    photos.forEach(function (item) {
      fragment.appendChild(createPhotoElement(item));
    });
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
    features.forEach(function (item) {
      fragment.appendChild(createFeatureElement(item));
    });
    return fragment;
  };

  var createCard = function (data) { // Заполняем шаблон объявления данными из объекта
    var card = similarCardTemplate.cloneNode(true);
    var price = card.querySelector('.popup__text--price');

    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    price.textContent = data.offer.price + ' ₽';
    price.innerHTML = price.textContent + '<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = offerTypeMap[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + window.util.getSuffix(parseInt(data.offer.rooms, 10), [' комната для ', ' комнаты для ', ' комнат для ']) + data.offer.guests + window.util.getSuffix(parseInt(data.offer.guests, 10), [' гостя', ' гостей', ' гостей']);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(generateFeatureFragment(data.offer.features));

    card.querySelector('.popup__description').textContent = data.offer.description;

    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(generatePhotoFragment(data.offer.photos));
    return card;
  };

  window.createCard = createCard;
})();
