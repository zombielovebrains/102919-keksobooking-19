'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ORIGINAL_SRC = 'img/muffin-grey.svg';
  var FileChooser = {
    avatar: document.querySelector('#avatar'),
    images: document.querySelector('#images')
  };

  var Preview = {
    avatar: document.querySelector('.ad-form-header__preview img'),
    images: document.querySelector('.ad-form__photo-container')
  };

  var deleteAvatar = function () {
    Preview.avatar.src = ORIGINAL_SRC;
  };

  var deleteImages = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function (item) {
      Preview.images.removeChild(item);
    });
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
    var file = FileChooser.avatar.files[0];
    var fileName = file.name.toLowerCase();

    if (checkType(fileName)) {
      createAvatarReader(Preview.avatar, file);
    }
  };

  var imagesUploadHandler = function () {
    var files = Array.from(FileChooser.images.files);
    var fileNames = getNames(files);

    if (fileNames.every(checkType)) {
      deleteImages();
      files.forEach(function (item) {
        createImagesReader(Preview.images, item);
      });
    }
  };

  FileChooser.avatar.addEventListener('change', avatarUploadHandler);
  FileChooser.images.addEventListener('change', imagesUploadHandler);

  window.deleteAllPhotos = deleteAllPhotos;
})();
