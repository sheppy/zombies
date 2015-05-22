/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import config from "./config";

var plugins = gulpLoadPlugins();

// Copy JS
gulp.task("html", () => {
    return gulp
        .src(path.join(config.dir.src, config.glob.html))
        .pipe(gulp.dest(config.dir.dist));
});
