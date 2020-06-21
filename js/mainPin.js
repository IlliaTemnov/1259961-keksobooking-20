
'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__overlay');

  mapPinMain.addEventListener('mousedown', function () {
    var evt = evt || window.event;
    if ('buttons' in evt) {
      if (evt.buttons === 1) {
        window.map.doActiveMap();
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.map.doActiveMap();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetBorders = {
        minX: 0,
        maxX: map.offsetWidth,
        minY: 130,
        maxY: 630
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if ((mapPinMain.offsetTop - shift.y) > offsetBorders.maxY || (mapPinMain.offsetTop - shift.y + window.data.Y_GAP) < offsetBorders.minY) {
        document.removeEventListener('mousemove', onMouseMove);
      } else if ((mapPinMain.offsetLeft - shift.x) > offsetBorders.maxX - window.data.X_GAP || (mapPinMain.offsetLeft - shift.x) < offsetBorders.minX - window.data.X_GAP) {
        document.removeEventListener('mousemove', onMouseMove);
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
