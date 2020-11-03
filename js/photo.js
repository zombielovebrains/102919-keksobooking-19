
(function () {
  'use strict';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ORIGINAL_SRC = 'img/muffin-grey.svg';
  var Loader = {
    AVATAR: document.querySelector('#avatar'),
    IMAGES: document.querySelector('#images')
  };

  var Preview = {
    AVATAR: document.querySelector('.ad-form-header__preview img'),
    IMAGES: document.querySelector('.ad-form__photo-container')
  };

  var deleteAvatar = function () {
    Preview.AVATAR.src = ORIGINAL_SRC;
  };

  var deleteImages = function () {
    var photos = Preview.IMAGES.querySelectorAll('.ad-form__photo');
    photos.forEach(function (item) {
      Preview.IMAGES.removeChild(item);
    });
  };

  var deleteImageSample = function () {
    var photo = Preview.IMAGES.querySelector('.ad-form__photo');
    if (photo && !photo.hasChildNodes()) {
      Preview.IMAGES.removeChild(photo);
    }
  };

  var deleteAllPhotos = function () {
    deleteAvatar();
    deleteImages();
  };

  var getNames = function (arr) {
    var names = [];
    arr.forEach(function (it) {
      names.push(it.name.toLowerCase());
    });
    return names;
  };

  var checkType = function (name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  };

  var createPhoto = function (src) {
    var elem = document.createElement('img');
    elem.src = src;
    elem.alt = 'Фотография жилья';
    elem.style.width = '100%';
    elem.style.height = 'auto';
    return elem;
  };

  var createPhotoBlock = function (src) {
    var elem = document.createElement('div');
    elem.classList.add('ad-form__photo');
    elem.style.overflow = 'hidden';
    elem.style.display = 'flex';
    elem.appendChild(createPhoto(src));
    return elem;
  };

  var createAvatarReader = function (preview, file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var createImagesReader = function (container, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      container.appendChild(createPhotoBlock(reader.result));
    });

    reader.readAsDataURL(file);
  };


  var avatarUploadHandler = function () {
    var file = Loader.AVATAR.files[0];
    var fileName = file.name.toLowerCase();

    if (checkType(fileName)) {
      createAvatarReader(Preview.AVATAR, file);
    }
  };

  var imagesUploadHandler = function () {
    var files = Array.from(Loader.IMAGES.files);
    var fileNames = getNames(files);

    if (fileNames.every(checkType)) {
      deleteImageSample();
      files.forEach(function (item) {
        createImagesReader(Preview.IMAGES, item);
      });
    }
  };

  Loader.AVATAR.addEventListener('change', avatarUploadHandler);
  Loader.IMAGES.addEventListener('change', imagesUploadHandler);

  window.deleteAllPhotos = deleteAllPhotos;
})();
