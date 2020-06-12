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

ads.forEach(function (ad) {
  var item = getRenderUnit(ad);
  fragment.appendChild(item.content);
});

mapPins.appendChild(fragment);

// ___________________________________________________________________________________

// var fillAdsCard = function (arr, template) {

//   var popupAdsTitle = template.querySelector('.popup__title');
//   var popupAdsAdress = template.querySelector('.popup__text--address');
//   var popupAdsPrice = template.querySelector('.popup__text--price');
//   var popupAdsType = template.querySelector('.popup__type');
//   var popupAdsCapacity = template.querySelector('.popup__text--capacity');
//   var popupAdsTime = template.querySelector('.popup__text--time');
//   var popupFeatures = template.querySelector('.popup__features');
//   var popupDescription = template.querySelector('.popup__description');
//   var popupPhotos = template.querySelector('.popup__photos');
//   var popupAvatar = template.querySelector('.popup__avatar');

//   var checkHousingType = function () {
//     if (arr[0].offer.type === 'flat') {
//       return 'Квартира';
//     } else if (arr[0].offer.type === 'bungalo') {
//       return 'Бунгало';
//     } else if (arr[0].offer.type === 'house') {
//       return 'Дом';
//     } else {
//       return 'Дворец';
//     }
//   };

//   if (arr[0].offer.hasOwnProperty('title')) {
//     popupAdsTitle.textContent = arr[0].offer.title;
//   } else {
//     popupAdsTitle.remove();
//   } if (arr[0].offer.hasOwnProperty('adress')) {
//     popupAdsAdress.textContent = arr[0].offer.adress;
//   } else {
//     popupAdsAdress.remove();
//   } if (arr[0].offer.hasOwnProperty('price')) {
//     popupAdsPrice.textContent = arr[0].offer.price + ' ₽/ночь';
//   } else {
//     popupAdsPrice.remove();
//   } if (arr[0].offer.hasOwnProperty('type')) {
//     popupAdsType.textContent = checkHousingType(arr[0].offer.type);
//   } else {
//     popupAdsType.remove();
//   } if (arr[0].offer.hasOwnProperty('rooms') && arr[0].offer.hasOwnProperty('guests')) {
//     popupAdsCapacity.textContent = arr[0].offer.rooms + ' комнаты';
//   } else {
//     popupAdsCapacity.remove();
//   } if (arr[0].offer.hasOwnProperty('checkin') && arr[0].offer.hasOwnProperty('checkout')) {
//     popupAdsTime.textContent = 'Заезд после' + arr[0].offer.checkin + ', выезд до' + arr[0].offer.checkout;
//   } else {
//     popupAdsTime.remove();
//   } if (arr[0].offer.hasOwnProperty('features')) {
//     popupFeatures.textContent = arr[0].offer.features;
//   } else {
//     popupFeatures.remove();
//   } if (arr[0].offer.hasOwnProperty('description')) {
//     popupDescription.textContent = arr[0].offer.description;
//   } else {
//     popupPhotos.remove();
//   } if (arr[0].offer.hasOwnProperty('photos')) {
//     popupPhotos.src = arr[0].offer.photos;
//   } else {
//     popupPhotos.remove();
//   } if (arr[0].author.hasOwnProperty('avatar')) {
//     popupAvatar.src = arr[0].author.avatar;
//   } else {
//     popupAvatar.remove();
//   }
// };

// var adsCardTemplate = document.querySelector('#card').content;
// var adsCard = adsCardTemplate.querySelector('.map__card').cloneNode(true);
// var randomCardObject = ads;

// fillAdsCard(randomCardObject, adsCard);

// var mapPinsAds = document.querySelector('.map .map__pins');
// mapPinsAds.insertAdjacentElement('afterend', adsCard);


// ___________________________________________________________________________________

var form = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
form.classList.add('disabled');
var adressField = document.querySelector('#address');
var houseTypeField = document.querySelector('#type');
var priceField = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var titleField = document.querySelector('#title');

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var PIN_HEIGHT = 45;

var roomsSelect = [
  {value: 1, label: '1 комната'},
  {value: 2, label: '2 комнаты'},
  {value: 3, label: '3 комнаты'},
  {value: 4, label: '100 комнат'},
];

var guestSelect = [
  {value: 1, label: 'для 1 гостя'},
  {value: 2, label: 'для 2 гостей'},
  {value: 3, label: 'для 3 гостей'},
  {value: 4, label: 'не для гостей'},
];

var mapRoomsToGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  4: [4]
};

var init = function () {
  var roomSelEl = document.querySelector('#room_number');
  var guestSelEl = document.querySelector('#capacity');

  roomsSelect.forEach(function (item) {
    var option = document.createElement('option');
    option.value = item.value;
    option.innerText = item.label;
    roomSelEl.appendChild(option);
  });

  guestSelect.forEach(function (item) {
    var option = document.createElement('option');
    option.value = item.value;
    option.innerText = item.label;
    guestSelEl.appendChild(option);
  });

  roomSelEl.addEventListener('change', function (evt) {
    var curValue = evt.target.value;
    var enabledGuestsCount = mapRoomsToGuests[curValue];
    guestSelEl.textContent = '';
    guestSelect.forEach(function (item) {
      if (enabledGuestsCount.indexOf(item.value) === -1) {
        return false;
      }
      var option = document.createElement('option');
      option.value = item.value;
      option.innerText = item.label;
      guestSelEl.appendChild(option);
      return item;
    });
  });
};

init();

adressField.value = map.offsetWidth / 2 + ', ' + map.offsetHeight / 2;

var doActiveMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  adressField.value = Math.round(map.offsetWidth / 2) + ', ' + Math.round(map.offsetHeight / 2 - PIN_HEIGHT);
};

mapPinMain.addEventListener('mousedown', function () {
  var evt = evt || window.event;
  if ('buttons' in evt) {
    if (evt.buttons === 1) {
      doActiveMap();
    }
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    doActiveMap();
  }
});

titleField.addEventListener('invalid', function (evt) {
  evt.preventDefault();
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Обязательное поле');
  } else {
    titleField.setCustomValidity('');
  }
});

titleField.addEventListener('input', function (evt) {
  evt.preventDefault();
  var valueLength = titleField.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleField.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleField.setCustomValidity('Удалите лишние ' + (valueLength - MIN_TITLE_LENGTH) + ' симв.');
  } else {
    titleField.setCustomValidity('');
  }
});

function getSelectedOptByText(sel) {
  return (sel.options[sel.selectedIndex].text);
}

function getSelectedOptByIndex(sel) {
  return (sel.options[sel.selectedIndex]);
}

var relateTypeAndValue = function () {
  switch (getSelectedOptByText(houseTypeField)) {
    case 'Бунгало':
      priceField.min = '0';
      priceField.placeholder = '0';
      break;
    case 'Квартира':
      priceField.min = '1 000';
      priceField.placeholder = '1 000';
      break;
    case 'Дом':
      priceField.min = '5 000';
      priceField.placeholder = '5 000';
      break;
    case 'Дворец':
      priceField.min = '10 000';
      priceField.placeholder = '10 000';
      break;
  }
};

houseTypeField.addEventListener('change', function (evt) {
  evt.preventDefault();
  relateTypeAndValue();
}
);

var relateTimeInTimeOut = function () {

  for (var i = 0; i < timeIn.length; i++) {
    if (timeIn[i] === getSelectedOptByIndex(timeIn)) {
      timeOut.selectedIndex = i;
    }
  }
};

timeIn.addEventListener('change', function (evt) {
  evt.preventDefault();
  relateTimeInTimeOut();
}
);

var relateTimeOutTimeIn = function () {

  for (var i = 0; i < timeOut.length; i++) {
    if (timeOut[i] === getSelectedOptByIndex(timeOut)) {
      timeIn.selectedIndex = i;
    }
  }
};

timeOut.addEventListener('change', function (evt) {
  evt.preventDefault();
  relateTimeOutTimeIn();
}
);

// form.addEventListener('change', function (evt) {
//   evt.preventDefault();
//   relateTypeAndValue();
//   relateTimeInTimeOut();
// }
// );

