'use strict';

(function () {
  var PINS_COUNT = 5;
  var STARTING_INDEX = 0;
  var Select = {
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
    features: Array.from(document.querySelectorAll('.map__checkbox'))
  };

  var setFilters = function (dataList, callback) {
    callback(filter(dataList));

    Select.type.addEventListener('change', function () {
      callback(filter(dataList));
    });

    Select.price.addEventListener('change', function () {
      callback(filter(dataList));
    });

    Select.rooms.addEventListener('change', function () {
      callback(filter(dataList));
    });

    Select.guests.addEventListener('change', function () {
      callback(filter(dataList));
    });

    document.addEventListener('change', function (evt) {
      if (evt.target.classList.contains('map__checkbox')) {
        callback(filter(dataList));
        console.log('111')
      };
    });
  };

  var filterByQuantity = function (dataList) {
    return dataList.slice(STARTING_INDEX, PINS_COUNT);
  };

  var filter = function (dataList) {
    var dataListCopy = dataList.slice();
    dataListCopy = filterByType(dataListCopy);
    dataListCopy = filterByPrice(dataListCopy);
    dataListCopy = filterByRooms(dataListCopy);
    dataListCopy = filterByGuests(dataListCopy);
    dataListCopy = filterByFeatures(dataListCopy);
    return filterByQuantity(dataListCopy);
  };

  var filterByType = function (dataList) {
    switch (Select.type.value) {
      case 'any':
        return dataList;
      default:
        var filteredArray = dataList.filter(function (data) {
          return data.offer.type === Select.type.value;
        });
        return filteredArray;
    };
  };

  var filterByPrice = function (dataList) {
    switch (Select.price.value) {
      case 'middle':
        var filteredArray = dataList.filter(function (data) {
          return parseInt(data.offer.price, 10) >= 10000 && parseInt(data.offer.price, 10) < 50000;
        });
        return filteredArray;
      case 'low':
        var filteredArray = dataList.filter(function (data) {
          return parseInt(data.offer.price, 10) < 10000;
        });
        return filteredArray;
      case 'high':
        var filteredArray = dataList.filter(function (data) {
          return parseInt(data.offer.price, 10) >= 50000;
        });
        return filteredArray;
      default:
        return dataList;
    };
  };

  var filterByRooms = function (dataList) {
    switch (Select.rooms.value) {
      case 'any':
        return dataList;
      default:
        var filteredArray = dataList.filter(function (data) {
          return data.offer.rooms === parseInt(Select.rooms.value, 10);
        });
        return filteredArray;
    };
  };

  var filterByGuests = function (dataList) {
    switch (Select.guests.value) {
      case 'any':
        return dataList;
      default:
        var filteredArray = dataList.filter(function (data) {
          return data.offer.guests === parseInt(Select.guests.value, 10);
        });
        return filteredArray;
    };
  };

  var filterByFeatures = function (dataList) {
    var filteredArray = [];

    var checkedFeatures = Select.features.filter(function (data) {
      return data.checked;
    });

    dataList.forEach(function (data) {
      if (checkContains(data.offer.features, checkedFeatures)) {
        filteredArray.push(data);
      }
    });
    // var filteredArray = dataList.filter(function (data) {
    //   return checkContains(data.offer.features, checkedFeatures);
    // });
    return filteredArray;
  };

  var checkContains = function (set, subset) {
    // subset.forEach(function (item) {
    //   if (set.indexOf(item) == -1) {
    //     return false
    //   };
    // });
    // return true;
    for (var i = 0; i < subset.length; i++) {
      if (set.indexOf(subset[i]) == -1) {
        return false;
      }
    }
    return true;
  };

  window.setFilters = setFilters;
})();
