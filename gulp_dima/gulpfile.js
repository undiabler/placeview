// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var less = require('gulp-less');
var watch = require('gulp-watch');

// Compile Our less
gulp.task('less', function() {
    return gulp.src('../src/less/placeview.less')
        .pipe(less())
        .pipe(gulp.dest('../web/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../src/less/placeview.less', ['less']);
});

// Default Task
gulp.task('default', ['less', 'watch']);