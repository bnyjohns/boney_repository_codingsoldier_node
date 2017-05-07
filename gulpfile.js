var gulp = require('gulp');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

// development mode?
var devBuild = (process.env.NODE_ENV !== 'production');

var srcFolder = "srcEs6/";
var publicFolder = srcFolder + "public/";

//JavaScript processing
gulp.task('jsTask', function() {
    var jsbuild = gulp.src(publicFolder + 'js/paging.js')
                    .pipe(deporder())
                    .pipe(concat('bundle.min.js'))
                    .pipe(stripdebug())
                    .pipe(uglify());
    return jsbuild.pipe(gulp.dest(publicFolder + 'js/'));
});

gulp.task('wrapperTask', ['copyPublicFolderTask', 'copyViewsFolderTask', 'babelifyTask', 'jsTask', 'cssTask']);

gulp.task('copyPublicFolderTask', function(){
    return gulp.src(srcFolder + 'public/*/*.*')
            .pipe(gulp.dest('dist/public'));
});

gulp.task('copyViewsFolderTask', function(){
    gulp.src(srcFolder + 'views/*/*.vash')
    .pipe(gulp.dest('dist/views'));
});

//Babel processing
gulp.task('babelifyTask', function(){
    return gulp.src([srcFolder + '*/*.js', srcFolder + '*/*/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(rename(f => {
        //     f.basename = f.basename.replace('.es6','');
        // }))
        .pipe(gulp.dest('dist'));
});

// CSS processing
gulp.task('cssTask', function(){
    var cssbuild = gulp.src(publicFolder + 'css/*')
                    .pipe(concat('site.min.css'))
                    .pipe(postcss([cssnano]));
    return cssbuild.pipe(gulp.dest(publicFolder + 'css/'));
});

gulp.task('watch', ['babelifyTask'], function () {
    gulp.watch('*.js', ['babelifyTask']);
});

gulp.task('default', ['wrapperTask']);