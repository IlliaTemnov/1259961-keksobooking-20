
'use strict';

(function () {

  var fillAdsCard = function (arr, template) {
    var mapContainer = document.querySelector('.map');
    var popupAdsTitle = template.querySelector('.popup__title');
    var popupAdsAdress = template.querySelector('.popup__text--address');
    var popupAdsPrice = template.querySelector('.popup__text--price');
    var popupAdsType = template.querySelector('.popup__type');
    var popupAdsCapacity = template.querySelector('.popup__text--capacity');
    var popupAdsTime = template.querySelector('.popup__text--time');
    var popupFeatures = template.querySelector('.popup__features');
    var popupDescription = template.querySelector('.popup__description');
    var popupPhotos = template.querySelector('.popup__photos');
    var photo = template.querySelector('.popup__photo');
    var popupAvatar = template.querySelector('.popup__avatar');

    var featureWifi = template.querySelector('.popup__feature--wifi');
    var featureDishwasher = template.querySelector('.popup__feature--dishwasher');
    var featureParking = template.querySelector('.popup__feature--parking');
    var featureWasher = template.querySelector('.popup__feature--washer');
    var featureElevator = template.querySelector('.popup__feature--elevator');
    var featureConditioner = template.querySelector('.popup__feature--conditioner');

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

    var getFeature = function (feature) {
      switch (feature) {
        case 'wifi':
          feature = featureWifi;
          break;
        case 'dishwasher':
          feature = featureDishwasher;
          break;
        case 'parking':
          feature = featureParking;
          break;
        case 'washer':
          feature = featureWasher;
          break;
        case 'elevator':
          feature = featureElevator;
          break;
        case 'conditioner':
          feature = featureConditioner;
          break;
        default:
          break;
      }

      return feature;
    };

    var addCardAvatar = function () {
      if (arr.author.avatar !== null) {
        popupAvatar.src = arr.author.avatar;
        template.appendChild(popupAvatar);
      }
    };

    var addCardTitle = function () {
      if (arr.offer.title !== null) {
        popupAdsTitle.textContent = arr.offer.title;
        template.appendChild(popupAdsTitle);
      }
    };

    var addCardAddress = function () {
      if (arr.offer.address !== null) {
        popupAdsAdress.textContent = arr.offer.address;
        template.appendChild(popupAdsAdress);
      }
    };

    var addCardPrice = function () {
      if (arr.offer.price !== null) {
        popupAdsPrice.textContent = arr.offer.price + ' ₽/ночь';
        template.appendChild(popupAdsPrice);
      }
    };

    var addCardType = function () {
      if (arr.offer.type !== null) {
        popupAdsType.textContent = checkHousingType(arr.offer.type);
        template.appendChild(popupAdsType);
      }
    };

    var addCardCapacity = function () {
      if (arr.offer.rooms !== null && arr.offer.guests !== null) {
        popupAdsCapacity.textContent = arr.offer.rooms + ' комнаты для '
        + arr.offer.guests + ' гостей.';

        template.appendChild(popupAdsCapacity);
      }
    };

    var addCardTime = function () {
      if (arr.offer.checkin !== null && arr.offer.checkout !== null) {
        popupAdsTime.textContent = 'Заезд после ' + arr.offer.checkin
        + ', выезд до ' + arr.offer.checkout + '.';

        template.appendChild(popupAdsTime);
      }
    };

    var addCardFeatures = function () {
      popupFeatures.innerHTML = '';
      if (arr.offer.features.length > 0) {
        arr.offer.features.forEach(function (feature) {
          popupFeatures.appendChild(getFeature(feature).cloneNode(true));
        });

        template.appendChild(popupFeatures);
      }
    };

    var addCardDescription = function () {
      if (arr.offer.description !== null) {
        popupDescription.textContent = arr.offer.description;
        template.appendChild(popupDescription);
      }
    };

    var addCardPhotos = function () {
      popupPhotos.innerHTML = '';
      if (arr.offer.photos.length > 0) {
        arr.offer.photos.forEach(function (photoSrc) {
          photo.src = photoSrc;
          popupPhotos.appendChild(photo.cloneNode(true));
        });
        template.appendChild(popupPhotos);
      }
    };

    var deleteCard = function () {
      var card = mapContainer.querySelector('.map__card');
      if (card !== null) {
        card.remove();

        window.pin.setCurrentPin(null);

        document.removeEventListener('keydown', onEscapeKeydown);
      }
    };

    var onEscapeKeydown = function (evt) {
      if (isEscapeEvent(evt)) {
        deleteCard();
      }
    };

    var isEscapeEvent = function (evt) {
      return evt.code === EventKeyCode.ESCAPE;
    };

    var EventKeyCode = {
      ENTER: 'Enter',
      NUMPAD_ENTER: 'NumpadEnter',
      ESCAPE: 'Escape',
    };

    addCardAvatar();
    addCardTitle();
    addCardAddress();
    addCardPrice();
    addCardType();
    addCardCapacity();
    addCardTime();
    addCardFeatures();
    addCardDescription();
    addCardPhotos();

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
