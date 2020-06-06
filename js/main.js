'use strict';

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
var housingType = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var housingFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var housingPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var minHundredsInt = 100;
var maxHundredsInt = 900;
var minDozensInt = 1;
var maxDozensInt = 10;
var xCoordMin = 0;
var xCoordMax = document.querySelector('.map__overlay').innerWidth;
var yCoordMin = 130;
var yCoordMax = 630;

var getRandomInt = function (numMin, numMax) {
  return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
};

var getRandomValue = function (arr) {
  var nameIndex = Math.round(Math.random() * (arr.length - 1));
  return arr[nameIndex];
};

var getRandomArrLength = function (arr) {
  var arrLength = getRandomInt(0, arr.length) - 1;
  return arr.slice(arrLength);
};

// eslint-disable-next-line no-unused-vars
var createUnitsArr = function (unitsQuantity) {
  var arr = [];
  for (var i = 1; i < unitsQuantity + 1; i++) {
    var unit = {
      author: {
        avatar: 'img/avatars/user{{' + imageAdress[i] + '}}.png'
      },
      offer: {
        title: 'Сдам навсегда!',
        adress: '{{location.' + getRandomInt(minHundredsInt, maxHundredsInt) + '}, {{location.' + getRandomInt(minHundredsInt, maxHundredsInt) + ' }}',
        price: getRandomInt(minHundredsInt, maxHundredsInt),
        type: getRandomValue(housingType),
        rooms: getRandomInt(minDozensInt, maxDozensInt),
        guests: getRandomInt(minDozensInt, maxDozensInt),
        checkin: getRandomValue(checkinTime),
        checkout: getRandomValue(checkoutTime),
        features: getRandomArrLength(housingFeatures),
        description: 'Волшебно, уютно, недорого',
        photos: getRandomArrLength(housingPhotos)
      },
      location: {
        x: getRandomInt(xCoordMin, xCoordMax),
        y: getRandomInt(yCoordMin, yCoordMax)
      }

    };
    arr.push(unit);
  }
  return arr;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin');

var mapPins = document.querySelector('.map__pins');


var getRenderUnit = function (unitObj) {
  var renderPinTemplate = pinTemplate.cloneNode(true);
  var pinButton = renderPinTemplate.querySelector('.map__pin');
  var avatarImg = renderPinTemplate.querySelector('.img');

  pinButton.style.left = unitObj.location.x - pinButton.offsetWidth / 2 + 'px';
  pinButton.style.top = unitObj.location.y - pinButton.offsetHeight + 'px';
  avatarImg.src = unitObj.author.avatar;
  avatarImg.alt = unitObj.offer.title;

  return renderPinTemplate;
};

var unitsNumber = 8;

var fragment = document.createDocumentFragment();
for (var i = 0; i < unitsNumber; i++) {
  fragment.appendChild(getRenderUnit(createUnitsArr(unitsNumber)));
}
mapPins.appendChild(fragment);


