var gulp = require('gulp'),
    gls = require('gulp-live-server');

gulp.task('default', function() {
    var server = gls.new('server.js');
    server.start();
    
    gulp.watch('public/**/*', function(file) {
        server.notify.apply(server, [file]);
    });
    gulp.watch('server.js', server.start.bind(server));
});