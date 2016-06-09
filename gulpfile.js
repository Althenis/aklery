var gulp = require('gulp'),
    gls = require('gulp-live-server');

gulp.task('default', function() {
    var server = gls.new('server.js');
    server.start();
    
    gulp.watch('server.js', function(file) {
        server.notify.apply(server, [file]);
        server.start.bind(server)();
    });
});