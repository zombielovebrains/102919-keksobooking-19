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
    return filterByQuantity(dataList.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByRooms(data) && filterByGuests(data) && filterByFeatures(data);
    }));
  };

  var filterByType = function (data) {
    switch (true) {
      case Select.type.value === 'any':
      case Select.type.value === data.offer.type:
        return true;
      default:
        return false;
    }
  };

  var filterByPrice = function (data) {
    switch (true) {
      case Select.price.value === 'any':
      case Select.price.value === 'middle' && parseInt(data.offer.price, 10) >= 10000 && parseInt(data.offer.price, 10) < 50000:
      case Select.price.value === 'low' && parseInt(data.offer.price, 10) < 10000:
      case Select.price.value === 'high' && parseInt(data.offer.price, 10) >= 50000:
        return true;
      default:
        return false;
    }
  };

  var filterByRooms = function (data) {
    switch (true) {
      case Select.rooms.value === 'any':
      case parseInt(Select.rooms.value, 10) === data.offer.rooms:
        return true;
      default:
        return false;
    }
  };

  var filterByGuests = function (data) {
    switch (true) {
      case Select.guests.value === 'any':
      case parseInt(Select.guests.value, 10) === data.offer.guests:
        return true;
      default:
        return false;
    }
  };

  var filterByFeatures = function (data) {
    var featureValues = Select.features.filter(function (elem) {
      return elem.checked;
    }).map(function (elem) {
      return elem.value
    });

    return checkContains(data.offer.features, featureValues);
  };

  var checkContains = function (set, subset) {
    for (var i = 0; i < subset.length; i++) {
      if (set.indexOf(subset[i]) == -1) {
        return false;
      }
    }
    return true;
};

  window.filter = {
    set: setFilters,
    check: checkFilter
  };
})();
