var gulp = require('gulp')
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
   nodemon({
       script: 'server.js',
       ext: 'js',
       env: {
           PORT: 8080,
           FILE: './swagger/swagger.yaml'
       },
       ignore: ['./node_modules/**']
   });
});

gulp.task('test', function () {
   gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));
});
