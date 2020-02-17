(function () {
  var ESC_CODE = 27;

  var similarCardList = document.querySelector('.map');

  var keyEscCloseHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    similarCardList.querySelector('.map__card').remove();
    document.removeEventListener('keydown', keyEscCloseHandler);
  };

  window.closeEvent = {
    card: closeCard,
    keyEsc: keyEscCloseHandler
  };
})();
