var gulp = require('gulp');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

// development mode?
var devBuild = (process.env.NODE_ENV !== 'production');

// folders
var folder = {
    src: 'public/',
    build: 'public/'
};

// JavaScript processing
gulp.task('jsTask', ['cssTask'], function() {
    var jsbuild = gulp.src(folder.src + 'js/paging.js')
                    .pipe(deporder())
                    .pipe(concat('bundle.min.js'))
                    .pipe(stripdebug())
                    .pipe(uglify());
    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
});

// CSS processing
gulp.task('cssTask', function(){
    var cssbuild = gulp.src(folder.src + 'css/*')
                    .pipe(concat('site.min.css'))
                    .pipe(postcss([cssnano]));
    return cssbuild.pipe(gulp.dest(folder.build + 'css/'));
});

// gulp.task('watch', ['jsTask'], function () {
//     gulp.watch('*.js', ['jsTask']);
// });

gulp.task('default', ['jsTask']);