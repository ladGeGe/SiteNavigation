var gulp = require('gulp');
var del = require('del');

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('copy', () => {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.series('clean', 'copy', () => {
    console.log('done!')
}));
