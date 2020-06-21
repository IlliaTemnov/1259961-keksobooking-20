'use strict';

(function () {

  var UNITS_NUMBER = 8;
  var MIN_HUNDREDS_INT = 100;
  var MAX_HUNDREDS_INT = 900;
  var MIN_DOZENS_INT = 1;
  var MAX_DOZENS_INT = 10;
  var Y_COORD_MIN = 130;
  var Y_COORD_MAX = 630;
  var X_COORD_MIN = 0;
  var X_COORD_MAX = window.main.map.offsetWidth;
  var X_GAP = 65 / 2;
  var Y_GAP = 78;

  var housingType = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTime = ['12:00', '13:00', '14:00'];
  var checkoutTime = ['12:00', '13:00', '14:00'];
  var housingFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var housingPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.data = {
    UNITS_NUMBER: UNITS_NUMBER,
    MIN_HUNDREDS_INT: MIN_HUNDREDS_INT,
    MAX_HUNDREDS_INT: MAX_HUNDREDS_INT,
    MIN_DOZENS_INT: MIN_DOZENS_INT,
    MAX_DOZENS_INT: MAX_DOZENS_INT,
    Y_COORD_MIN: Y_COORD_MIN,
    Y_COORD_MAX: Y_COORD_MAX,
    X_COORD_MIN: X_COORD_MIN,
    X_COORD_MAX: X_COORD_MAX,
    X_GAP: X_GAP,
    Y_GAP: Y_GAP,
    housingType: housingType,
    checkinTime: checkinTime,
    checkoutTime: checkoutTime,
    housingFeatures: housingFeatures,
    housingPhotos: housingPhotos
  };
})();
