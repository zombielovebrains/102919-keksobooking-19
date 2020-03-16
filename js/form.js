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
  var titleField = adForm.querySelector('#title');
  var priceField = adForm.querySelector('#price');
  var addressField = adForm.querySelector('#address');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var setAddress = function (arr) {
    addressField.value = arr[0] + ', ' + arr[1];
  };

  var disableForm = function () {
    adForm.reset();
    adFormHeader.disabled = true;
    window.util.changeDisabledAttribute(adFormElements, true);
    adForm.classList.add('ad-form--disabled');
  };

  var enableForm = function () {
    adFormHeader.disabled = false;
    window.util.changeDisabledAttribute(adFormElements, false);
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
    if (flatType.value === 'flat' && parseInt(priceField.value, 10) < 1000) {
      flatType.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
    } else if (flatType.value === 'house' && parseInt(priceField.value, 10) < 5000) {
      flatType.setCustomValidity('«Дом» — минимальная цена 5 000');
    } else if (flatType.value === 'palace' && parseInt(priceField.value, 10) < 10000) {
      flatType.setCustomValidity('«Дворец» — минимальная цена 10 000');
    } else {
      flatType.setCustomValidity('');
    }
  };

  titleField.addEventListener('invalid', function () {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Заголовок должно состоять минимум из 15 символов');
    } else if (titleField.validity.tooLong) {
      titleField.setCustomValidity('Заголовок не должен превышать 50 символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное поле');
    } else {
      titleField.setCustomValidity('');
    }
  });

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
