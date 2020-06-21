
'use strict';

(function () {

  var createUnitsArr = function (unitsQuantity) {
    var arr = [];
    for (var i = 1; i < unitsQuantity + 1; i++) {
      var unit = {
        author: {
          avatar: 'img/avatars/user' + window.main.imageAdress[i] + '.png'
        },
        offer: {
          title: 'Сдам навсегда!',

          adress: window.main.getRandomInt(window.data.MIN_HUNDREDS_INT, window.data.MAX_HUNDREDS_INT) + ', ' + window.main.getRandomInt(window.data.MIN_HUNDREDS_INT, window.data.MAX_HUNDREDS_INT),
          price: window.main.getRandomInt(window.data.MIN_HUNDREDS_INT, window.data.MAX_HUNDREDS_INT),
          type: window.main.getRandomValue(window.data.housingType),
          rooms: window.main.getRandomInt(window.data.MIN_DOZENS_INT, window.data.MAX_DOZENS_INT),
          guests: window.main.getRandomInt(window.data.MIN_DOZENS_INT, window.data.MAX_DOZENS_INT),
          checkin: window.main.getRandomValue(window.data.checkinTime),
          checkout: window.main.getRandomValue(window.data.checkoutTime),
          features: window.main.getRandomArrLength(window.data.housingFeatures),
          description: 'Волшебно, уютно, недорого',
          photos: window.main.getRandomArrLength(window.data.housingPhotos),
        },
        location: {
          x: window.main.getRandomInt(window.data.X_COORD_MIN, window.data.X_COORD_MAX),
          y: window.main.getRandomInt(window.data.Y_COORD_MIN, window.data.Y_COORD_MAX),
        }
      };
      arr.push(unit);
    }
    return arr;
  };

  var getRenderUnit = function (unitObj) {
    var renderPinTemplate = window.main.templatePin.cloneNode(true);
    var pinButton = renderPinTemplate.content.querySelector('.map__pin');
    var avatarImg = renderPinTemplate.content.querySelector('img');

    pinButton.style.left = unitObj.location.x - pinButton.offsetWidth / 2 + 'px';
    pinButton.style.top = unitObj.location.y - pinButton.offsetHeight + 'px';
    avatarImg.src = unitObj.author.avatar;
    avatarImg.alt = unitObj.offer.title;

    return renderPinTemplate;
  };

  var fragment = document.createDocumentFragment();

  var ads = createUnitsArr(window.data.UNITS_NUMBER);

  ads.forEach(function (ad) {
    var item = getRenderUnit(ad);
    fragment.appendChild(item.content);
  });

  window.main.mapPins.appendChild(fragment);
  window.pin = {
    ads: ads
  };
})();

