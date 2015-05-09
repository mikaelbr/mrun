'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    file = path.join(process.cwd(), 'package.json'),
    io = {
      read: function (cb) {
        fs.readFile(file, function (err, data) {
          var jsonData;
          if (err) return cb('Theres no package.json file in this directory.');
          try {
            jsonData = JSON.parse(data);
          } catch (ex) {
            return cb('Package.json in an illegal format.');
          }
          return cb(void 0, jsonData);
        });
      },
      write: function (data, cb) {
        fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
          cb(err, data);
        });
      }
    },
    dependencies = {
      'autoprefixer': '*',
      'wr': '*',
      'watchify': '*',
      'browserify': '*',
      'less': '*'
    };

var mrun = module.exports = function (settings, cb) {
  if (typeof settings === 'function') {
    cb = settings;
    settings = {};
  }
  io.read(function (err, data) {
    if (err) return cb(err);
    var newInput = handleFileIO(data, settings);
    io.write(newInput, cb);
  });
};

module.exports.create = function (read, write) {
  io.read = read;
  io.write = write;
  return mrun;
};

function scriptGenerator (styleFolder, browserFolder, targetFolder) {
  styleFolder = styleFolder || 'style';
  browserFolder = browserFolder || 'browser';
  targetFolder = targetFolder || 'static';

  return {
    'watch-css': "wr 'npm run build-css' " + styleFolder + '/',
    'watch-js': 'watchify ' + browserFolder + '/app.js -o ' + targetFolder + '/bundle.js -dv',
    'watch': 'npm run watch-css & npm run watch-js',
    'preprocess': 'autoprefixer ' + targetFolder + '/bundle.css',
    'build-css': 'lessc --include-path=' + styleFolder + '/ ' + styleFolder + '/app.less ' + targetFolder + '/bundle.css && npm run preprocess',
    'build-js': 'browserify ' + browserFolder + '/app.js -o ' + targetFolder + '/bundle.js',
    'build': 'npm run build-css; npm run build-js',
  };
}
function setContent (field, input, newSetup) {
  input[field] = input[field] || {};
  Object.keys(newSetup).forEach(function (key) {
    if (input[field][key]) return;
    input[field][key] = newSetup[key];
  });
  return input;
}
function handleFileIO (data, settings) {
  settings = settings || {};
  var newInput = setContent('scripts'
        , data
        , scriptGenerator(settings.style, settings.browser, settings.target)
      );
  return setContent('devDependencies', newInput, dependencies);
}