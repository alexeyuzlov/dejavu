module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        exec: {
            tsc: {
                cmd: "npx tsc -p tsconfig.json",
            },
        },
        copy: {
            app: {
                files: [
                    {
                        cwd: "app",
                        expand: true,
                        src: ["**/*.html", "!vendor/**/*.html", "assets/**/*"],
                        dest: "build/",
                    },
                ],
            },
            bower: {
                files: [
                    {
                        "build/vendor/phaser.min.js": "app/vendor/phaser.min.js",
                    },
                ],
            },
        },
        open: {
            app: {
                path: "http://localhost:8080",
            },
        },
        connect: {
            app: {
                options: {
                    port: 8080,
                    base: "build",
                    livereload: true,
                },
            },
            playwright: {
                options: {
                    port: 8080,
                    base: "build",
                    keepalive: true,
                },
            },
        },
        watch: {
            app: {
                files: "app/**/*",
                tasks: ["exec:tsc", "copy"],
                options: {
                    livereload: true,
                },
            },
        },
    });

    grunt.registerTask("build", ["exec:tsc", "copy"]);
    grunt.registerTask("default", ["exec:tsc", "copy", "open", "connect", "watch"]);
};
