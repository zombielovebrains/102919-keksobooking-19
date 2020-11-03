
(function () {
  'use strict';
  var adForm = document.querySelector('.ad-form');
  var adFormHeaderFieldset = adForm.querySelector('.ad-form-header');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  var roomNumberField = adForm.querySelector('#room_number');
  var flatTypeField = adForm.querySelector('#type');
  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');
  var capacityField = adForm.querySelector('#capacity');
  var priceField = adForm.querySelector('#price');
  var addressField = adForm.querySelector('#address');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
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
    adFormHeaderFieldset.disabled = true;
    window.util.changeDisabledAttribute(adFormFieldsets, true);
    adForm.classList.add('ad-form--disabled');
  };

  var enableForm = function () {
    adFormHeaderFieldset.disabled = false;
    window.util.changeDisabledAttribute(adFormFieldsets, false);
    adForm.classList.remove('ad-form--disabled');
  };

  var checkCapacityField = function () {
    if (roomNumberField.value === '1' && capacityField.value !== '1') {
      capacityField.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumberField.value === '2' && (capacityField.value !== '1' || capacityField.value !== '2')) {
      capacityField.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberField.value === '3' && capacityField.value === '0') {
      capacityField.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberField.value === '100' && capacityField.value !== '0') {
      capacityField.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  var checkFlatTypeField = function () {
    var minPrice = minPrices[flatTypeField.value];
    if (parseInt(priceField.value, 10) < minPrice) {
      flatTypeField.setCustomValidity('Минимальная цена за ночь ' + minPrice);
    } else {
      flatTypeField.setCustomValidity('');
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
    adFormResetButton.addEventListener('click', function () {
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
