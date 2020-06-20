'use strict';

(function () {

  var callBackClick = function (evt) {

    var adsPin = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (adsPin) {
      window.card.renderCardUnit(evt);
      // search curr ads card and close button
      var mapCard = document.querySelector('.popup');
      var popupCloseButton = document.querySelector('.popup__close');
      // add hidden and remove handler
      var closePopup = function () {
        mapCard.classList.add('hidden');
      };
      // hide ads card with click
      popupCloseButton.addEventListener('click', function () {
        closePopup();
      });
      mapCard.classList.remove('hidden');// hide ads card with ESC
    }
  };

  document.addEventListener('keydown', function (evt) {
    var mapCard = document.querySelector('.popup');
    if (evt.key === 'Escape') {
      if (mapCard) {
        event.preventDefault();
        mapCard.classList.add('hidden');
      }
    }
  });

  window.main.mapPins.addEventListener('click', function (evt) {
    callBackClick(evt);
  });

  // render card with Enter
  window.main.mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      callBackClick(evt);
    }
  });
})();
