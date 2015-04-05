mrun - A npm module for setting npm run properties to build/watch less and browserify code
===

A simple npm/terminal tool to set your package.json file to have scripts to
build or watch less and browserify code. CSS will also be autoprefixed.

Following tools will be set as dependencies:

 * autoprefixer
 * wr
 * watchify
 * browserify
 * less


__Entry file for less and js should be `app.{js,css}`__

## Installing

```
npm install -g mrun
```

## Usage

To see usage run: ```mrun -h```:

```
Usage: mrun [ "style directory" "browser code directory" "target directory" ]
(run in package root dir).

-----

Update package.json file with run scripts text to build or watch
less and javascripts files. Entry file for less and js should be app.{js,css}

-----

Argument overview:
Style directory: Where the less files are
Browser code directory: Where the browserify compatible code resides.
Target directory: Where the compiled files are placed.

Without arguments the defaults are: [ 'style', 'browser', 'static' ]
```

To add default scripts (with style folder ```style```, js code from
```browser``` and storing the compiled files to ```target```) run
the binary without arguments:

```
mrun
```

## API

```
npm install mrun
```

```javascript
var mrun = require('mrun')
  , handleRespone = function(err, newPackage) {
    if(err) throw Error(err);
    console.log("New packageJson");
    console.dir(newPackage);
};

mrun(handleRespone);

// Or with options:
mrun({
      style: 'anotherStyleDirectory'
    , browser: 'anotherBrowserDirectory'
    , target: 'anotherTargetDirectory'
  }, handleRespone);
```
