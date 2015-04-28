var fs = require('fs'),
	path = require('path'),
	// cache = require('gulp-cached'),
  filesize = require('gulp-size'),
  minifyCSS = require('gulp-minify-css'),
	browserify = require('gulp-browserify'),
  reactify = require('reactify'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch'),
	jshint = require('gulp-jshint'),
    gulp = require('gulp'), // Сообственно Gulp JS
    livereload = require('gulp-livereload'), // Livereload для Gulp
    myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'); // Склейка файлов


function getFolders(dir){
    return fs.readdirSync(dir)
      .filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

var scriptsPath = './../src/js/';
var scriptsDest = './../assets/js/';

    // gulp.src(['./../js/**/*.js'],{base: './'})
    //     .pipe(concat('engine.js'))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('app'));

gulp.task('build', function() {

    var folders = getFolders(scriptsPath);

   	var tasks = folders.map(function(folder) {
   		
   	  var src_file=path.join(scriptsPath, folder, '/main.js');
      
      return gulp.src(src_file)
      	// .pipe(cache(src_file))
      	.pipe(jshint())
      	.pipe(jshint.reporter('default'))
      	.pipe(browserify({
            insertGlobals : false,
            transform : [reactify],
            debug : false
          }))
        .pipe(rename(folder + '.dev.js'))
        .pipe(gulp.dest(scriptsDest))
        .pipe(filesize({gzip:true}))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(scriptsDest))
        .pipe(filesize({gzip:true}));
   });
});

var cssPath = './../src/css/';
var cssDest = './../assets/css/';

gulp.task('css', function () {

   var folders = getFolders(cssPath);

    var tasks = folders.map(function(folder) {
      
      var src_file=path.join(cssPath, folder, '/*.css');
      
      return gulp.src(src_file)
 
        .pipe(concat('main.css'))
        .pipe(rename(folder + '.css'))
        .pipe(filesize({gzip:true}))
        .pipe(minifyCSS())
        .pipe(filesize({gzip:true}))
        .pipe(gulp.dest(cssDest));
 
   });


});

gulp.task('watch', function(){
  gulp.watch(['./../src/js/**/*.js'], ['build']);
});