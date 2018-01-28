let gulp 	= require('gulp'),
	fs 		= require('fs'),
	tsc		= require('gulp-tsc');

/* Compila TS do servidor */
gulp.task('compile-release', () => {
	let config = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'))
	console.log(config.compilerOptions)
	gulp.src('main/Main.ts').pipe(tsc(config.compilerOptions)).pipe(gulp.dest("build"))
})

/* Compila os tests */
gulp.task('compile-tests', () => {
	gulp.src("tests/*.ts")
		.pipe(tsc({target:"ES5", experimentalDecorators: true, outDir:"build"}))
		.pipe(gulp.dest("build"))
})