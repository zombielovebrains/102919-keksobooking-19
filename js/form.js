'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var roomNumber = adForm.querySelector('#room_number');
  var flatType = adForm.querySelector('#type');
  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');
  var capacity = adForm.querySelector('#capacity');
  var priceField = adForm.querySelector('#price');
  var addressField = adForm.querySelector('#address');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var minPrices = {
    flat: 1000,
    house: 5000,
    palace: 10000,
    bungalo: 0
  };

  var setAddress = function (arr) {
    addressField.value = arr[0] + ', ' + arr[1];
  };

  var disableForm = function () {
    adForm.reset();
    adFormHeader.disabled = true;
    window.changeDisabledAttribute(adFormElements, true);
    adForm.classList.add('ad-form--disabled');
  };

  var enableForm = function () {
    adFormHeader.disabled = false;
    window.changeDisabledAttribute(adFormElements, false);
    adForm.classList.remove('ad-form--disabled');
  };

  var checkCapacityField = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumber.value === '2' && (capacity.value !== '1' || capacity.value !== '2')) {
      capacity.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumber.value === '3' && capacity.value === '0') {
      capacity.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var checkFlatTypeField = function () {
    var minPrice = minPrices[flatType.value];
    if (parseInt(priceField.value, 10) < minPrice) {
      flatType.setCustomValidity('Минимальная цена за ночь ' + minPrice);
    } else {
      flatType.setCustomValidity('');
    }
  };

  timeInField.addEventListener('change', function () {
    timeOutField.value = timeInField.value;
  });

  timeOutField.addEventListener('change', function () {
    timeInField.value = timeOutField.value;
  });

  adFormSubmitButton.addEventListener('click', function () {
    checkCapacityField();
    checkFlatTypeField();
  });

  var setSubmit = function (callbackFirst, callbackSecond) {
    adForm.addEventListener('submit', function (evt) {
      window.server.upload(new FormData(adForm), callbackFirst, callbackSecond);
      evt.preventDefault();
    });
  };

  var setReset = function (callback) {
    resetButton.addEventListener('click', function () {
      callback();
      window.deleteAllPhotos();
    });
  };

  window.form = {
    setAddress: setAddress,
    disable: disableForm,
    enable: enableForm,
    setSubmitAction: setSubmit,
    setResetAction: setReset
  };
})();
