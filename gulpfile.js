const gulp = require('gulp'),
			sass = require('gulp-sass'),
			cssmin = require('gulp-minify-css');
			prefixer = require('gulp-autoprefixer'),
			connect = require('gulp-connect');

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/css/images/',
        fonts: 'build/fonts/',
        contentImg: 'build/img/'
    },
    src: {
				html: 'src/*.html',
        js: 'src/js/[^_]*.js',
        css: 'src/css/style.sass',
				cssVendor: 'src/css/vendor/*.*',
        cssPartials: 'src/css/partials/*.*',
        img: 'src/css/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        contentImg: 'src/img/**/*.*'
    },
    watch: {
				html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.*',
        img: 'src/css/images/**/*.*',
        contentImg: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build',
    outputDir: './build'
};

gulp.task('connect', function () {
  connect.server({
    name: 'Dev App',
		root: [path.outputDir],
    port: 3000,
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src(path.src.css)
		.pipe(sass().on('error', sass))
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(gulp.dest(path.build.css))
		.pipe(connect.reload());
})

gulp.task('watch', function() {
	gulp.watch(path.src.css, ['sass']);
	gulp.watch(path.src.html, ['html']);
})

gulp.task('default', ['connect', 'watch']);