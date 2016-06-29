var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({
        script: 'server.js',
        ext: 'html js json',
        env: { 'NODE_ENV': 'development'}
    });
});

// gulp.task('default', function() {
//     var server = gls('server.js');
//     server.start().then(function(result) {
//         console.log('Server exited with result:', result);
//         process.exit(result.code);
//    });
//    
//    gulp.watch(['server.js','public/**/*'], function(file) {
//         server.start.bind(server);
//         server.notify.apply(server, [file]);
//         
//     });
//     gulp.watch('server.js', server.start);
//     
//     gulp.watch('public/**/*', function(file) {
//         server.notify.apply(server, [file]);
//         console.log('refreshing');
//     });
//     
//     gulp.watch('server.js', function() {
//         server.start.bind(server);
//         console.log('Server restarted');
//     });
//     server.stop();
// });