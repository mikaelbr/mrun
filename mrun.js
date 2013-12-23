'use strict';

var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , file = path.join(process.cwd(), 'package.json')
  , readFile = function (cb) {
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
    }
  , saveFile = function (data, cb) {
      fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
        cb(err, data);
      });
    }
  , dependencies = {
      "catw": "*"
    , "watchify": "*"
    , "browserify": "*"
    , "less": "*"
  }
  , scriptGenerator = function (styleFolder, browserFolder, targetFolder) {
    styleFolder = styleFolder || 'style';
    browserFolder = browserFolder || 'browser';
    targetFolder = targetFolder || 'static';

    return {
        "watch-css": "catw -c 'lessc -' '" + styleFolder + "/*.less' -o " + targetFolder + "/bundle.css -v"
      , "watch-js": "watchify " + browserFolder + "/*.js -o " + targetFolder + "/bundle.js -dv"
      , "watch": "npm run watch-css & npm run watch-js"
      , "build-css": "catw -c 'lessc -' '" + styleFolder + "/*.less' > " + targetFolder + "/bundle.css"
      , "build-js": "browserify " + browserFolder + "/*.js > " + targetFolder + "/bundle.js"
      , "build": "npm run build-css && npm run build-js"
    };
  }
  , setContent = function (field, input, newSetup) {
      input[field] = input[field] || {};
      Object.keys(newSetup).forEach(function (key) {
        if (input[field][key]) return;
        input[field][key] = newSetup[key];
      });
      return input;
    }
  ;

module.exports = function (settings, cb) {
  if (typeof settings === 'function') {
    cb = settings;
    settings = {};
  }
  readFile(function (err, data) {
    if (err) return cb(err);
    var newInput = setContent("scripts"
          , data
          , scriptGenerator(settings.style, settings.browser, settings.target)
        );
    newInput = setContent("devDependencies", newInput, dependencies);
    saveFile(newInput, cb);
  });
};
