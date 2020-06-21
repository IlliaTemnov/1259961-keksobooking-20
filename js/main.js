'use strict';

(function () {

  var mapUnit = document.querySelector('.map');
  var templatePin = document.querySelector('#pin');
  var mapPinsUnit = document.querySelector('.map__pins');

  var createLeadZeroList = function (numMin, numMax) {
    var array = [];
    for (var i = numMin - 1; i < numMax + 1; i++) {
      array.push(addLeadZeroFunc(i));
    }
    return array;
  };

  var addLeadZeroFunc = function (num) {
    return '0' + num;
  };

  var getRandomIntFunc = function (numMin, numMax) {
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
  };

  var getRandomValueFunc = function (arr) {
    var nameIndex = Math.round(Math.random() * (arr.length - 1));
    return arr[nameIndex];
  };

  var getRandomArrLengthFunc = function (arr) {
    return arr.slice(0, arr.length - window.main.getRandomInt(0, arr.length));
  };

  window.main = {

    map: mapUnit,
    templatePin: templatePin,
    mapPins: mapPinsUnit,
    imageAdress: createLeadZeroList(1, 8),
    createLeadZeroArr: createLeadZeroList,
    addLeadZero: addLeadZeroFunc,
    getRandomInt: getRandomIntFunc,
    getRandomValue: getRandomValueFunc,
    getRandomArrLength: getRandomArrLengthFunc
  };
})();
