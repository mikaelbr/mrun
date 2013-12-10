mrun - A npm module for setting npm run properties to build/watch less and browserify code
===

A simple npm/terminal tool to set your package.json file to have scripts to
build or watch less and browserify code as described by [substack](https://gist.github.com/substack)
in [this gist](https://gist.github.com/substack/7819530).

Instead of copypasting the code from the gist you can automaticly insert it into
your ```package.json```file. You can also define the folders you want to use.

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
less and javascripts files.

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

## Credits

This is a really simple module and just ment to work as a convenient. All creative
credit, and thought work belongs to substack and [this gist](https://gist.github.com/substack/7819530).

## Contribute

I'm open for pull requests. I want to expand this module by adding tests to make it more robust
and possibly expand the functionality.
