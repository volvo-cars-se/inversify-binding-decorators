"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    runSequence = require("run-sequence"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul");

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function () {

    var config = {
        fornatter: "verbose",
        emitError: (process.env.CI) ? true : false
    };

    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
        .pipe(tslint(config))
        .pipe(tslint.report());
});

//******************************************************************************
//* SOURCE
//******************************************************************************
var tsLibProject = tsc.createProject("tsconfig.json", {
    module: "commonjs"
});

gulp.task("build-lib", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsLibProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("lib/"));
});

var tsAmdProject = tsc.createProject("tsconfig.json", {
    module: "amd"
});

gulp.task("build-amd", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsAmdProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("amd/"));
});


var tsEsProject = tsc.createProject("tsconfig.json", {
    module: "es2015"
});

gulp.task("build-es", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsEsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("es/"));
});

var tsDtsProject = tsc.createProject("tsconfig.json", {
    declaration: true,
    noResolve: false
});

gulp.task("build-dts", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsDtsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .dts.pipe(gulp.dest("dts"));

});

//******************************************************************************
//* TESTS
//******************************************************************************
var tstProject = tsc.createProject("tsconfig.json");

gulp.task("build-src", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tstProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("src/"));
});

var tsTestProject = tsc.createProject("tsconfig.json", { rootDir: "./" });

gulp.task("build-test", function () {
    return gulp.src([
        "test/**/*.ts"
    ])
        .pipe(tsTestProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("./test/"));
});

gulp.task("mocha", function () {
    return gulp.src([
        "node_modules/reflect-metadata/Reflect.js",
        "test/**/*.test.js"
    ])
        .pipe(mocha({
            ui: "bdd"
        }))
        .pipe(istanbul.writeReports());
});

gulp.task("istanbul:hook", function () {
    return gulp.src(["src/**/*.js"])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", gulp.series("istanbul:hook", "mocha"));

gulp.task("build",
    gulp.series(
        "lint",
        gulp.parallel(
            "build-src",
            "build-es",
            "build-lib",
            "build-amd",
            "build-dts"
        )
    )
);

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", gulp.series(
    "build"
));
