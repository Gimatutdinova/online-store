import rigger from 'gulp-rigger'; //
import uglify from 'gulp-uglify'; // Сжатие JS файла
import rename from 'gulp-rename';

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(rigger())
        .pipe(rename({
            extname: ".js"
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}