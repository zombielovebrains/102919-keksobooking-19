'use strict';

(function () {
  var PINS_COUNT = 5;
  var STARTING_INDEX = 0;
  var Select = {
    form: document.querySelector('.map__filters'),
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
    features: Array.from(document.querySelectorAll('.map__checkbox'))
  };

  var setFilters = function (handler) {
    Select.form.addEventListener('change', handler);
  };

  var filterByQuantity = function (dataList) {
    return dataList.slice(STARTING_INDEX, PINS_COUNT);
  };

  var checkFilter = function (dataList) {
    var featureValues = Select.features.filter(function (elem) {
      return elem.checked;
    }).map(function (elem) {
      return elem.value;
    });

    return filterByQuantity(dataList.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByRooms(data) && filterByGuests(data) && filterByFeatures(data, featureValues);
    }));
  };

  var filterByType = function (data) {
    return Select.type.value === 'any' || Select.type.value === data.offer.type;
  };

  var filterByPrice = function (data) {
    return Select.price.value === 'any' || (Select.price.value === 'middle' && parseInt(data.offer.price, 10) >= 10000 && parseInt(data.offer.price, 10) < 50000) ||
    (Select.price.value === 'low' && parseInt(data.offer.price, 10) < 10000) || (Select.price.value === 'high' && parseInt(data.offer.price, 10) >= 50000);
  };

  var filterByRooms = function (data) {
    return Select.rooms.value === 'any' || parseInt(Select.rooms.value, 10) === data.offer.rooms;
  };

  var filterByGuests = function (data) {
    return Select.guests.value === 'any' || parseInt(Select.guests.value, 10) === data.offer.guests;
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
