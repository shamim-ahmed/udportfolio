var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var imageResize = require('gulp-image-resize');
var merge = require('merge-stream');

var buildFolder = './build';

gulp.task('default', ['minify-css', 'minify-js', 'minify-html', 'resize-image']);

gulp.task('minify-css', function() {
  var css_set_1 = gulp.src('./css/*.css').pipe(cleanCss()).pipe(gulp.dest(buildFolder + '/css'));
  var css_set_2 = gulp.src('./views/css/*.css').pipe(cleanCss()).pipe(gulp.dest(buildFolder + '/views/css'));

  return merge(css_set_1, css_set_2);
});

gulp.task('minify-js', function() {
   var js_set_1 = gulp.src('./js/*.js').pipe(uglify()).pipe(gulp.dest(buildFolder + '/js'));
   var js_set_2 = gulp.src('./views/js/*.js').pipe(uglify()).pipe(gulp.dest(buildFolder + '/views/js'));

   return merge(js_set_1, js_set_2);
});

gulp.task('minify-html', function() {
  var html_set_1 = gulp.src('*.html').pipe(minifyHtml()).pipe(gulp.dest(buildFolder));
  var html_set_2 = gulp.src('views/*.html').pipe(minifyHtml()).pipe(gulp.dest(buildFolder + '/views'));

  return merge(html_set_1, html_set_2);
});

gulp.task('resize-image', function() {
  var img_set_1 = gulp.src('./img/**/*.{jpg,png}').pipe(imageResize({width: 100}).pipe(gulp.dest(buildFolder + '/img')));
  var img_set_2 = gulp.src('./views/images/*.{jpg,png}').pipe(imageResize({width: 100}).pipe(gulp.dest(buildFolder + '/views/images')));
  return merge(img_set_1, img_set_2);
});
