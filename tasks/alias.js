/*eslint-env node */

import gulp from "gulp";
import runSequence from "run-sequence";


gulp.task("dev", ["test"], callback =>
    runSequence(
        "clean",
        ["js"],
        callback
    )
);

gulp.task("lint", ["js-lint"]);

gulp.task("test", ["lint"], callback =>
    runSequence(
        "clean:test",
        ["js-test"],
        callback
    )
);

gulp.task("default", ["dev"]);
