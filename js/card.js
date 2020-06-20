
'use strict';

(function () {

  var fillAdsCard = function (arr, template) {

    var popupAdsTitle = template.querySelector('.popup__title');
    var popupAdsAdress = template.querySelector('.popup__text--address');
    var popupAdsPrice = template.querySelector('.popup__text--price');
    var popupAdsType = template.querySelector('.popup__type');
    var popupAdsCapacity = template.querySelector('.popup__text--capacity');
    var popupAdsTime = template.querySelector('.popup__text--time');
    var popupFeatures = template.querySelector('.popup__features');
    var popupDescription = template.querySelector('.popup__description');
    var popupPhotos = template.querySelector('.popup__photos');
    var popupAvatar = template.querySelector('.popup__avatar');

    var checkHousingType = function () {
      if (arr.offer.type === 'flat') {
        return 'Квартира';
      } else if (arr.offer.type === 'bungalo') {
        return 'Бунгало';
      } else if (arr.offer.type === 'house') {
        return 'Дом';
      } else {
        return 'Дворец';
      }
    };

    if (arr.offer.hasOwnProperty('title')) {
      popupAdsTitle.textContent = arr.offer.title;
    } else {
      popupAdsTitle.remove();
    } if (arr.offer.hasOwnProperty('adress')) {
      popupAdsAdress.textContent = arr.offer.adress;
    } else {
      popupAdsAdress.remove();
    } if (arr.offer.hasOwnProperty('price')) {
      popupAdsPrice.textContent = arr.offer.price + ' ₽/ночь';
    } else {
      popupAdsPrice.remove();
    } if (arr.offer.hasOwnProperty('type')) {
      popupAdsType.textContent = checkHousingType(arr.offer.type);
    } else {
      popupAdsType.remove();
    } if (arr.offer.hasOwnProperty('rooms') && arr.offer.hasOwnProperty('guests')) {
      popupAdsCapacity.textContent = arr.offer.rooms + ' комнаты';
    } else {
      popupAdsCapacity.remove();
    } if (arr.offer.hasOwnProperty('checkin') && arr.offer.hasOwnProperty('checkout')) {
      popupAdsTime.textContent = 'Заезд после' + arr.offer.checkin + ', выезд до' + arr.offer.checkout;
    } else {
      popupAdsTime.remove();
    } if (arr.offer.hasOwnProperty('features')) {
      popupFeatures.textContent = arr.offer.features;
    } else {
      popupFeatures.remove();
    } if (arr.offer.hasOwnProperty('description')) {
      popupDescription.textContent = arr.offer.description;
    } else {
      popupPhotos.remove();
    } if (arr.offer.hasOwnProperty('photos')) {
      popupPhotos.src = arr.offer.photos;
    } else {
      popupPhotos.remove();
    } if (arr.author.hasOwnProperty('avatar')) {
      popupAvatar.src = arr.author.avatar;
    } else {
      popupAvatar.remove();
    }
    var mapPinsAds = document.querySelector('.map .map__pins');
    mapPinsAds.insertAdjacentElement('afterend', adsCard);
  };

  var adsCardTemplate = document.querySelector('#card').content;
  var adsCard = adsCardTemplate.querySelector('.map__card').cloneNode(true);

  var renderCard = function (evt) {
    var getCurrentMapId = function () {
      var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
      var pinsArr = window.main.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var index = Array.prototype.indexOf.call(pinsArr, mapPin);
      return index;
    };
    fillAdsCard(window.pin.ads[getCurrentMapId()], adsCard);
  };

  window.card = {
    renderCardUnit: renderCard
  };

})();
