module.exports = function (grunt) {
    var devPort = Number(grunt.option('port') || process.env.PORT || 8080);
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        typescript: {
            app: {
                src: ['app/scripts/Game.ts'],
                dest: 'build/js/main.js',
                options: {
                    sourceMap: true
                }
            }
        },
        copy: {
            app: {
                files: [
                    {
                        cwd: 'app',
                        expand: true,
                        src: ['**/*.html', '!vendor/**/*.html', 'assets/**/*'],
                        dest: 'build/'
                    }
                ]
            },
            bower: {
                files: [
                    {
                        'build/vendor/phaser.min.js': 'app/vendor/phaser-official/build/phaser.min.js',
                        'build/vendor/stats.min.js': 'app/vendor/stats.js/build/stats.min.js'
                    }
                ]
            }
        },
        open: {
            app: {
                path: 'http://localhost:' + devPort
            }
        },
        connect: {
            app: {
                options: {
                    port: devPort,
                    base: 'build',
                    livereload: true
                }
            }
        },
        watch: {
            app: {
                files: 'app/**/*',
                tasks: ['typescript', 'copy'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', ['typescript', 'copy', 'open', 'connect', 'watch']);
}