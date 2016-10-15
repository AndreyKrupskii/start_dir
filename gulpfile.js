const gulp = require('gulp');
const browserSync = require('browser-sync').create(),
			reload = browserSync.reload;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


const path = {
	src: {
		html: './src/client/**/*.html',
		sass: './src/client/sass/**/*.sass',
		js: './src/client/js/**/*.js'
	},
	dest: {
		html: './public/',
		css: './public/css/',
		js: './public/js/',
		publicDir: './public/',
	}
};

gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: path.dest.publicDir
		},
		// proxy: "localhost:2016",
		tunnel: 'andrey',
		online: false
	});
});

gulp.task('html', () =>{
	gulp.src(path.src.html)
	.pipe(gulp.dest(path.dest.html))
	.pipe(reload({stream: true}));
});

gulp.task('sass', ()=>{
	gulp.src(path.src.sass)
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(path.dest.css))
	.pipe(reload({stream: true}));
});

gulp.task('js', ()=>{
	gulp.src(path.src.js)
	.pipe(babel())
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest(path.dest.js))
	.pipe(reload({stream: true}));
});

gulp.task('watch', ()=>{
	gulp.watch(path.src.html, ['html']);
	gulp.watch(path.src.sass, ['sass']);
	gulp.watch(path.src.js, ['js']);
});

gulp.task('build', ['html', 'sass', 'js']);
gulp.task('default', ['sync', 'build', 'watch']);

