(function () {
  var PINS_COUNT = 5;
  var STARTING_INDEX = 0;
  var typeSelect = document.querySelector('#housing-type');

  var filterByQuantity = function (dataList) {
    return dataList.slice(STARTING_INDEX, PINS_COUNT);
  };

  var filter = function (dataList, callback) {
    var dataListCopy = Array.from(dataList).slice();
    callback(filterByQuantity(dataListCopy));

    typeSelect.addEventListener('change', function () {
      filterByOfferType(dataListCopy, callback);
    });
  };

  var filterByOfferType = function (dataList, callback) {
    if (typeSelect.value !== 'any') {
      var filteredArray = dataList.filter(function (data) {
        return data.offer.type === typeSelect.value;
      });
      callback(filterByQuantity(filteredArray));
    } else {
      callback(filterByQuantity(dataList));
    }
  };

  window.filter = filter;
})();
