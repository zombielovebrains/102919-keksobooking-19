'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var similarCardList = document.querySelector('.map');

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

  var createCard = function (data) { // Заполняем шаблон объявления данными из объекта
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + ' &#x20bd;' + '<span>/ночь</span>';
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

  var renderCard = function (data) {
    var card = createCard(data);
    var openedCard = similarCardList.querySelector('.map__card');

    if (openedCard !== null) {
      openedCard.remove();
    }
    similarCardList.insertBefore(card, document.querySelector('.map__filters-container'));

    document.addEventListener('keydown', window.closeEvent.keyEsc);

    card.querySelector('.popup__close').addEventListener('click', function () {
      window.closeEvent.card();
    });
  };

  window.card = {
    render: renderCard
  };
})();
