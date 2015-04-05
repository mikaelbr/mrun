var should = require("should"),
    create = require("../mrun").create;

describe("mrun", function () {

  it("should read from package.json", function (done) {
    var mrun = create(function (cb) {
      cb(void 0, {
        "foo": "bar"
      });
    }, function (data, cb) {
      data.should.have.property("foo", "bar");
      done();
    });
    mrun();
  });

  it("should set create scripts field if not set before", function (done) {
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      data.should.have.property("scripts");
      done();
    });
    mrun();
  });

  it("should keep existing values in scripts object", function (done) {
    var stub = {
      name: "Test",
      scripts: {
        "test": "echo \"No tests\""
      }
    };
    var mrun = create(function (cb) {
      stub.should.have.property("scripts");
      stub.should.have.property("scripts").with.property("test");
      cb(void 0, stub);
    }, function (data, cb) {
      data.should.have.property("scripts");
      stub.should.have.property("scripts").with.property("test");
      done();
    });
    mrun();
  });

  it("should add devDependencies if not exists", function (done) {
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("devDependencies");
      cb(void 0, stub);
    }, function (data, cb) {
      data.should.have.property("devDependencies");
      done();
    });
    mrun();
  });

  it("should keep existing values in devDependencies object", function (done) {
    var stub = {
      name: "Test",
      devDependencies: {
        "mocha": ">=0.0.1"
      }
    };
    var mrun = create(function (cb) {
      stub.should.have.property("devDependencies");
      stub.should.have.property("devDependencies").with.property("mocha");
      cb(void 0, stub);
    }, function (data, cb) {
      data.should.have.property("devDependencies");
      stub.should.have.property("devDependencies").with.property("mocha");
      done();
    });
    mrun();
  });

  it("should add catw, watchify, browserify and less to devDependencies", function (done) {
    var stub = {
      name: "Test",
      devDependencies: {
        "mocha": ">=0.0.1"
      }
    };
    var mrun = create(function (cb) {
      stub.should.have.property("devDependencies");
      stub.should.have.property("devDependencies").with.property("mocha");
      cb(void 0, stub);
    }, function (data, cb) {
      data.should.have.property("devDependencies");
      stub.should.have.property("devDependencies").with.property("mocha");
      stub.should.have.property("devDependencies").with.property("autoprefixer", "*");
      stub.should.have.property("devDependencies").with.property("wr", "*");
      stub.should.have.property("devDependencies").with.property("watchify", "*");
      stub.should.have.property("devDependencies").with.property("browserify", "*");
      stub.should.have.property("devDependencies").with.property("less", "*");
      done();
    });
    mrun();
  });

  it("should add watching to scripts", function (done) {
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("watch");
      stub.should.have.property("scripts").with.property("watch-js");
      stub.should.have.property("scripts").with.property("watch-css");
      done();
    });
    mrun();
  });

  it("should have watch-css to default folder of 'style' and output 'static'", function (done) {
    var defaultValue = "wr 'lessc --include-path=style/ style/app.less static/bundle.css' style/";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("watch-css", defaultValue);
      done();
    });
    mrun();
  });

  it("should have watch-js to default folder of 'browser' and output 'static'", function (done) {
    var defaultValue = "watchify browser/app.js -o static/bundle.js -dv";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("watch-js", defaultValue);
      done();
    });
    mrun();
  });

  it("should have watch have set correct scripts", function (done) {
    var defaultValue = "npm run watch-css & npm run watch-js";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("watch", defaultValue);
      done();
    });
    mrun();
  });

  it("should have build-css have set default values", function (done) {
    var defaultValue = "lessc style/app.less static/bundle.css";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("build-css", defaultValue);
      done();
    });
    mrun();
  });

  it("should have build-js have set default values", function (done) {
    var defaultValue = "browserify browser/app.js > static/bundle.js";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("build-js", defaultValue);
      done();
    });
    mrun();
  });

  it("should have 'build' set to correct script", function (done) {
    var defaultValue = "npm run build-css && npm run build-js";
    var stub = {
      name: "Test"
    };
    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("build", defaultValue);
      done();
    });
    mrun();
  });


  it("should be able to override default folders", function (done) {
    var styleFolder = 'foo1',
        targetFolder = 'foo2',
        browserFolder = 'foo3',
        defaultValues = {
          "watch-css": "wr 'lessc --include-path=" + styleFolder + "/ " + styleFolder + "/app.less " + targetFolder + "/bundle.css' " + styleFolder + "/",
          "watch-js": "watchify " + browserFolder + "/app.js -o " + targetFolder + "/bundle.js -dv",
          "build-css": "lessc " + styleFolder + "/app.less " + targetFolder + "/bundle.css",
          "build-js": "browserify " + browserFolder + "/app.js > " + targetFolder + "/bundle.js",
        };

    var stub = {
      name: "Test"
    };

    var mrun = create(function (cb) {
      stub.should.not.have.property("scripts");
      cb(void 0, stub);
    }, function (data, cb) {
      stub.should.have.property("scripts").with.property("watch-css", defaultValues['watch-css']);
      stub.should.have.property("scripts").with.property("watch-js", defaultValues['watch-js']);
      stub.should.have.property("scripts").with.property("build-css", defaultValues['build-css']);
      stub.should.have.property("scripts").with.property("build-js", defaultValues['build-js']);
      done();
    });

    mrun({
        "style": styleFolder
      , "browser": browserFolder
      , "target": targetFolder
    });
  });

});