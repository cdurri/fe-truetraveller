var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence').use(gulp);
var pug = require('gulp-pug');
var eslint = require('gulp-eslint');
var watch = require('gulp-watch');
var data = require('gulp-data');
var merge = require('gulp-merge-json');
var path = require('path');
var fs = require('file-system');
const autoprefixer = require('gulp-autoprefixer');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
var babel = require("gulp-babel");
const babelMinify = require("gulp-babel-minify");

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['./app', 'node_modules']
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.scss') //Source all files ending with.scss in scss directory and its subdirectories
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('minifyJS', function() {
  return gulp.src('app/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('criticalCSS', () => {
  return gulp.src('app/sass/criticalCSS.scss')
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePaths: ['.']
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/views/**/*.pug', ['pug']);
  gulp.watch('app/js/main.js', ['minifyJS']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/css/*.css', browserSync.reload);
});

gulp.task('useref', function() {
  return gulp.src('app/*.html') //Source all html files
    .pipe(useref())
    .pipe(gulpIf('*.js', babel()))
    // .pipe(gulpIf('*.js', uglify())) //Minifies only if it is js file
    .pipe(gulpIf('*.js', babelMinify({
      mangle: {
        keepClassName: true
      }
    }))) //Minifies only if it is js file
    .pipe(gulpIf('*.css', cssnano())) //Minifies only if it is css file
    .pipe(gulp.dest('dist'))
});

gulp.task('lic', function() {
  return gulp.src('app/*.md') //Source all license files
    .pipe(gulp.dest('dist'))
});

gulp.task('imagemin', function() {
  return gulp.src('app/images/*.+(png|jpg|gif|swg|svg|ico)')
    .pipe(cache(imagemin({
      gif: {
        interlaced: true
      }
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('clean:app', function() {
  return del.sync(['app/css/styles.css', 'app/*.html', 'dist']);
});

gulp.task('pug', ['pug:data'], function buildHTML() {
  return gulp.src(['!app/views/_*.pug', 'app/views/*.pug'])
    .pipe(plugins.plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./app/temp/data.json'));
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('pug:data', function() {
  return gulp.src('app/data/*.json')
    .pipe(merge({
      fileName: 'data.json',
    }))
    .pipe(gulp.dest('./app/temp'));
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'criticalCSS', 'pug', 'browserSync', 'watch'],
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'criticalCSS', 'minifyJS', 'pug', 'useref', 'lic', 'imagemin', 'fonts'], callback);
});

gulp.task('clean', function(callback) {
  runSequence('clean:dist', 'clean:app', callback);
});

gulp.task('lint', function() {
  return gulp.src('app/js/index.js')
    // Load a specific ESLint config
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format());
});
