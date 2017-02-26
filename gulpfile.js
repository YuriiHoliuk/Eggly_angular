var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['app/**/*.js', 'app/**/*.html', 'assets/css/*.css', '*.html'], browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ''
        },
        notify: true
    });
});

gulp.task('default', ['watch']);