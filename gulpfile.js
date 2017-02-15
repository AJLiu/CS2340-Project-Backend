let gulp = require('gulp');
let gutil = require('gulp-util');
let nodemon = require('nodemon');
let path = require('path');
let tsProject = require("gulp-typescript").createProject("tsconfig.json");
let sourcemaps = require('gulp-sourcemaps');
let tslint = require("./lib/gulp-tslint");


gulp.task('build', ['lint'], (done) => {
  gutil.log(gutil.colors.yellow("Compiling Typescript"));
  return tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(tsProject())
      .js.pipe(sourcemaps.write())
      .pipe(gulp.dest("build"));
});

gulp.task('nodemon',['build'], (done) => {
  gutil.log(gutil.colors.blue("Starting server"));
  nodemon({
            script: path.join(__dirname, 'build/bin/www.js'),
            watch: ['build/'],
            env: {'NODE_ENV': 'dev', 'SESSION_SECRET': 'secret'}
          })
      .on('start', function () {
        gutil.log(gutil.colors.blue("Server started!"));
      })
});

gulp.task('watch', (done) => {
  gutil.log('Watching', gutil.colors.magenta('./app'));
  gulp.watch('app/**/*.ts', ['build']);
});

gulp.task('lint', (done) => {
  return gulp.src("app/**/*.ts")
      .pipe(tslint({formatter: "prose"}))
      .pipe(tslint.report({emitError: false}));
});

gulp.task('default', ['nodemon', 'watch']);