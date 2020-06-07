'use strict';

var map = document.querySelector('.map');
var template = document.querySelector('#pin');
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
  var renderPinTemplate = template.cloneNode(true);
  var pinButton = renderPinTemplate.content.querySelector('.map__pin');
  var avatarImg = renderPinTemplate.content.querySelector('img');

  pinButton.style.left = unitObj.location.x - pinButton.offsetWidth / 2 + 'px';
  pinButton.style.top = unitObj.location.y - pinButton.offsetHeight + 'px';
  avatarImg.src = unitObj.author.avatar;
  avatarImg.alt = unitObj.offer.title;

  return renderPinTemplate;
};

var fragment = document.createDocumentFragment();
// for (var i = 0; i < UNITS_NUMBER; i++) {
//   fragment.appendChild(getRenderUnit(createUnitsArr(UNITS_NUMBER)));
// }
var ads = createUnitsArr(UNITS_NUMBER);

ads.forEach(function (ad) {
  var item = getRenderUnit(ad);
  fragment.appendChild(item.content);
});

mapPins.appendChild(fragment);
