var gulp = require('gulp');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

// development mode?
var devBuild = (process.env.NODE_ENV !== 'production');

//Order: CleanTask, BabelifyTask, JSTask, CSSTask, CopyTasks 

var srcFolder = "srcEs6/";
var publicFolder = srcFolder + "public/";

//Clean Dist Folder
gulp.task('cleanTask', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('babelifyTask', ['cleanTask'], function(){
    return gulp.src([srcFolder + '*/*.js', srcFolder + '*/*/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(rename(f => {
        //     f.basename = f.basename.replace('.es6','');
        // }))
        .pipe(gulp.dest('dist'));
});

gulp.task('jsTask', ['babelifyTask'], function() {
    var jsbuild = gulp.src(publicFolder + 'js/paging.js')
                    .pipe(deporder())
                    .pipe(concat('bundle.min.js'))
                    .pipe(stripdebug())
                    .pipe(uglify());
    return jsbuild.pipe(gulp.dest(publicFolder + 'js/'));
});

gulp.task('cssTask', ['jsTask'], function(){
    var cssbuild = gulp.src(publicFolder + 'css/*')
                    .pipe(concat('site.min.css'))
                    .pipe(postcss([cssnano]));
    return cssbuild.pipe(gulp.dest(publicFolder + 'css/'));
});

gulp.task('copyPublicFolderTask', ['cssTask'], function(){
    return gulp.src(srcFolder + 'public/*/*.*')
            .pipe(gulp.dest('dist/public'));
});

gulp.task('copyViewsFolderTask', ['copyPublicFolderTask'], function(){
    gulp.src(srcFolder + 'views/*/*.vash')
    .pipe(gulp.dest('dist/views'));
});

// gulp.task('watch', ['babelifyTask'], function () {
//     gulp.watch('*.js', ['babelifyTask']);
// });

gulp.task('default', ['copyViewsFolderTask']);