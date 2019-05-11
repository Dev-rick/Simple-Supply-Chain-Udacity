var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify-es').default;
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var htmlclean   = require('gulp-htmlclean');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var webserver   = require('gulp-webserver');
var del = require('del');

var paths = {

  srcContracts: 'build/contracts/*',

  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcImages: 'src/imgs/*',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/css',
  distJS: 'dist/**/*.js',
  distContracts: 'dist/contracts',
  distImages: 'dist/images'
};

gulp.task('copy:contracts', function () {
  return gulp.src(paths.srcContracts)
    .pipe(gulp.dest(paths.distContracts));
});
gulp.task('copy:images', function () {
  return gulp.src(paths.srcImages)
    .pipe(gulp.dest(paths.distImages));
});
gulp.task('html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.distCSS));
});

gulp.task('clean:dist', function () {
  return del([
    'dist'
  ]);
});


gulp.task('copy-truffle-contract', function () {
    return gulp.src('src/js/truffle-contract.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
  });

  gulp.task('build', gulp.series('clean:dist', 'copy:contracts', 'copy:images', 'copy-truffle-contract', 'html', 'css', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './src/js/app.js', debug: true})
        .transform("babelify")
        .bundle()
        .pipe(source('./app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
}));

gulp.task('serve', gulp.series('build', function () {
  return gulp.src(paths.dist)
  .pipe(webserver({
    port: 3000,
    livereload: true
  }));
}));

gulp.task('watch', gulp.series('serve', function () {
  livereload.listen();
  gulp.watch(paths.src, gulp.series('build'));
}));


gulp.task('default', gulp.series('watch'));