'use strict';

(function () {
  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking',
  };

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var POST = 'POST';
  var GET = 'GET';

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var connectError = function () {
      onError('Произошла ошибка соединения');
    };
    var responceError = function () {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    };
    var responceTimeOut = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        responceError();
      }
    });

    xhr.addEventListener('error', function () {
      connectError();
    });

    xhr.addEventListener('timeout', function () {
      responceTimeOut();
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open(GET, URL.GET, true);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open(POST, URL.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
