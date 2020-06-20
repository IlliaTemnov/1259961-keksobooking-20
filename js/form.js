'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  form.classList.add('disabled');
  var adressField = document.querySelector('#address');
  var houseTypeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var titleField = document.querySelector('#title');
  var roomSelEl = document.querySelector('#room_number');
  var guestSelEl = document.querySelector('#capacity');

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var PIN_HEIGHT = 45;

  guestSelEl.value = '1';
  roomSelEl.value = '1';

  var checkRoomsAndGuests = function () {
    roomSelEl.setCustomValidity('');
    guestSelEl.setCustomValidity('');
    if (Number(roomSelEl.value) === 100 && Number(guestSelEl.value) === 0) {
      guestSelEl.setCustomValidity('');
    } else {
      if (Number(roomSelEl.value) >= Number(guestSelEl.value) && Number(guestSelEl.value) !== 0 && Number(roomSelEl.value) !== 100) {
        guestSelEl.setCustomValidity('');
      } else {
        guestSelEl.setCustomValidity('Заданному количеству гостей будет слишком тесно в таком месте');
      }
    }
  };

  roomSelEl.addEventListener('change', function () {
    checkRoomsAndGuests();
  });

  guestSelEl.addEventListener('change', function () {
    checkRoomsAndGuests();
  });

  adressField.value = window.main.map.offsetWidth / 2 + ', ' + window.main.map.offsetHeight / 2;

  var doActiveMap = function () {
    window.main.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    adressField.value = Math.round(window.main.map.offsetWidth / 2) + ', ' + Math.round(window.main.map.offsetHeight / 2 - PIN_HEIGHT);
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

  titleField.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (evt.target.validity.tooShort) {
      titleField.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (evt.target.validity.tooLong) {
      titleField.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (evt.target.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  titleField.addEventListener('input', function (evt) {
    evt.preventDefault();
    var valueLength = titleField.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleField.setCustomValidity('Добавьте ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleField.setCustomValidity('Удалите лишние ' + (valueLength - MIN_TITLE_LENGTH) + ' симв.');
    } else {
      evt.target.setCustomValidity('');
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
        priceField.min = '1000';
        priceField.placeholder = '1000';
        break;
      case 'Дом':
        priceField.min = '5000';
        priceField.placeholder = '5000';
        break;
      case 'Дворец':
        priceField.min = '10000';
        priceField.placeholder = '10000';
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
  });

})();
