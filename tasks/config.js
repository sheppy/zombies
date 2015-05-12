/*eslint-env node */

export default {
    glob: {
        html: "**/*.html",
        jade: "**/*.jade",
        css: "**/*.css",
        scss: "**/*.scss",
        es6: "**/*.js",
        js: "**/*.js",
        json: "**/*.json"
    },
    dir: {
        src: "./src",
        dist: "./public",
        coverage: "./coverage",
        es6: "./src/assets/js",
        js: "./public/assets/js",
        tasks: "./tasks",
        tests: "./tests"
    },
    file: {
        gulpfile: "./gulpfile.js",
        esLint: "./.eslintrc"
    },

    browsers: ["last 2 versions"]
};
