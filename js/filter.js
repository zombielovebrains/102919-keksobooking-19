'use strict';

(function () {
  var PINS_COUNT = 5;
  var STARTING_INDEX = 0;
  var Select = {
    FORM: document.querySelector('.map__filters'),
    TYPE: document.querySelector('#housing-type'),
    PRICE: document.querySelector('#housing-price'),
    ROOMS: document.querySelector('#housing-rooms'),
    GUESTS: document.querySelector('#housing-guests'),
    FEATURES: Array.from(document.querySelectorAll('.map__checkbox'))
  };

  var PriceValue = {
    MIDDLE: {
      BOTTOM: 10000,
      TOP: 50000
    },
    LOW: 10000,
    HIGH: 50000
  };

  var setFilters = function (handler) {
    Select.FORM.addEventListener('change', handler);
  };

  var filterByQuantity = function (dataList) {
    return dataList.slice(STARTING_INDEX, PINS_COUNT);
  };

  var checkFilter = function (dataList) {
    var featureValues = Select.FEATURES.filter(function (elem) {
      return elem.checked;
    }).map(function (elem) {
      return elem.value;
    });

    return filterByQuantity(dataList.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByRooms(data) && filterByGuests(data) && filterByFeatures(data, featureValues);
    }));
  };

  var filterByType = function (data) {
    return Select.TYPE.value === 'any' || Select.TYPE.value === data.offer.type;
  };

  var filterByPrice = function (data) {
    return Select.PRICE.value === 'any' || (Select.PRICE.value === 'middle' && parseInt(data.offer.price, 10) >= PriceValue.MIDDLE.BOTTOM && parseInt(data.offer.price, 10) < PriceValue.MIDDLE.TOP) ||
    (Select.PRICE.value === 'low' && parseInt(data.offer.price, 10) < PriceValue.LOW) || (Select.PRICE.value === 'high' && parseInt(data.offer.price, 10) >= PriceValue.HIGH);
  };

  var filterByRooms = function (data) {
    return Select.ROOMS.value === 'any' || parseInt(Select.ROOMS.value, 10) === data.offer.rooms;
  };

  var filterByGuests = function (data) {
    return Select.GUESTS.value === 'any' || parseInt(Select.GUESTS.value, 10) === data.offer.guests;
  };

  var filterByFeatures = function (data, featureValues) {
    return checkContains(data.offer.features, featureValues);
  };

  var checkContains = function (set, subset) {
    return subset.every(function (feature) {
      return set.includes(feature);
    });
  };

  window.filter = {
    set: setFilters,
    check: checkFilter
  };
})();
