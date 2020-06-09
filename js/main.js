'use strict';

var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');

var UNITS_NUMBER = 8;
var MIN_HUNDREDS_INT = 100;
var MAX_HUNDREDS_INT = 900;
var MIN_DOZENS_INT = 1;
var MAX_DOZENS_INT = 10;
var Y_COORD_MIN = 130;
var Y_COORD_MAX = 630;
var X_COORD_MIN = 0;
var X_COORD_MAX = map.offsetWidth;

var housingType = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var housingFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var housingPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var addLeadZero = function (num) {
  return '0' + num;
};

var createLeadZeroArr = function (numMin, numMax) {
  var array = [];

  for (var i = numMin - 1; i < numMax + 1; i++) {
    array.push(addLeadZero(i));
  }
  return array;
};

var imageAdress = createLeadZeroArr(1, 8);

var getRandomInt = function (numMin, numMax) {
  return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
};

var getRandomValue = function (arr) {
  var nameIndex = Math.round(Math.random() * (arr.length - 1));
  return arr[nameIndex];
};

var getRandomArrLength = function (arr) {
  return arr.slice(0, arr.length);
};

var createUnitsArr = function (unitsQuantity) {
  var arr = [];
  for (var i = 1; i < unitsQuantity + 1; i++) {
    var unit = {
      author: {
        avatar: 'img/avatars/user' + imageAdress[i] + '.png'
      },
      offer: {
        title: 'Сдам навсегда!',
        adress: getRandomInt(MIN_HUNDREDS_INT, MAX_HUNDREDS_INT) + ', ' + getRandomInt(MIN_HUNDREDS_INT, MAX_HUNDREDS_INT),
        price: getRandomInt(MIN_HUNDREDS_INT, MAX_HUNDREDS_INT),
        type: getRandomValue(housingType),
        rooms: getRandomInt(MIN_DOZENS_INT, MAX_DOZENS_INT),
        guests: getRandomInt(MIN_DOZENS_INT, MAX_DOZENS_INT),
        checkin: getRandomValue(checkinTime),
        checkout: getRandomValue(checkoutTime),
        features: getRandomArrLength(housingFeatures),
        description: 'Волшебно, уютно, недорого',
        photos: getRandomArrLength(housingPhotos)
      },
      location: {
        x: getRandomInt(X_COORD_MIN, X_COORD_MAX),
        y: getRandomInt(Y_COORD_MIN, Y_COORD_MAX)
      }

    };
    arr.push(unit);
  }
  return arr;
};

map.classList.remove('map--faded');

var getRenderUnit = function (unitObj) {
  var renderPinTemplate = templatePin.cloneNode(true);
  var pinButton = renderPinTemplate.content.querySelector('.map__pin');
  var avatarImg = renderPinTemplate.content.querySelector('img');

  pinButton.style.left = unitObj.location.x - pinButton.offsetWidth / 2 + 'px';
  pinButton.style.top = unitObj.location.y - pinButton.offsetHeight + 'px';
  avatarImg.src = unitObj.author.avatar;
  avatarImg.alt = unitObj.offer.title;

  return renderPinTemplate;
};

var fragment = document.createDocumentFragment();

var ads = createUnitsArr(UNITS_NUMBER);

// ____________________________________

// for (var i = 0; i < ads.length; i++) {
//   var item = getRenderUnit(ads[i]);
//   fragment.appendChild(item.content);
// }
// ____________________________

ads.forEach(function (ad) {
  var item = getRenderUnit(ad);
  fragment.appendChild(item.content);
});

mapPins.appendChild(fragment);

// ___________________________________________________________________________________

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
    if (arr[0].offer.type === 'flat') {
      return 'Квартира';
    } else if (arr[0].offer.type === 'bungalo') {
      return 'Бунгало';
    } else if (arr[0].offer.type === 'house') {
      return 'Дом';
    } else {
      return 'Дворец';
    }
  };

  if (arr[0].offer.hasOwnProperty('title')) {
    popupAdsTitle.textContent = arr[0].offer.title;
  } else {
    popupAdsTitle.remove();
  } if (arr[0].offer.hasOwnProperty('adress')) {
    popupAdsAdress.textContent = arr[0].offer.adress;
  } else {
    popupAdsAdress.remove();
  } if (arr[0].offer.hasOwnProperty('price')) {
    popupAdsPrice.textContent = arr[0].offer.price + ' ₽/ночь';
  } else {
    popupAdsPrice.remove();
  } if (arr[0].offer.hasOwnProperty('type')) {
    popupAdsType.textContent = checkHousingType(arr[0].offer.type);
  } else {
    popupAdsType.remove();
  } if (arr[0].offer.hasOwnProperty('rooms') && arr[0].offer.hasOwnProperty('guests')) {
    popupAdsCapacity.textContent = arr[0].offer.rooms + ' комнаты';
  } else {
    popupAdsCapacity.remove();
  } if (arr[0].offer.hasOwnProperty('checkin') && arr[0].offer.hasOwnProperty('checkout')) {
    popupAdsTime.textContent = 'Заезд после' + arr[0].offer.checkin + ', выезд до' + arr[0].offer.checkout;
  } else {
    popupAdsTime.remove();
  } if (arr[0].offer.hasOwnProperty('features')) {
    popupFeatures.textContent = arr[0].offer.features;
  } else {
    popupFeatures.remove();
  } if (arr[0].offer.hasOwnProperty('description')) {
    popupDescription.textContent = arr[0].offer.description;
  } else {
    popupPhotos.remove();
  } if (arr[0].offer.hasOwnProperty('photos')) {
    popupPhotos.src = arr[0].offer.photos;
  } else {
    popupPhotos.remove();
  } if (arr[0].author.hasOwnProperty('avatar')) {
    popupAvatar.src = arr[0].author.avatar;
  } else {
    popupAvatar.remove();
  }
};

var adsCardTemplate = document.querySelector('#card').content;
var adsCard = adsCardTemplate.querySelector('.map__card').cloneNode(true);
var randomCardObject = ads;

fillAdsCard(randomCardObject, adsCard);

var mapPinsAds = document.querySelector('.map .map__pins');
mapPinsAds.insertAdjacentElement('afterend', adsCard);
