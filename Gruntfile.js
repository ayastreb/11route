'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            build: {
                command: 'bundle exec jekyll build'
            }
        },
        buildcontrol: {
            options: {
                dir: '_site',
                commit: true,
                push: true,
                message: 'Built 11route.com from commit %sourceCommit% on branch %sourceBranch%'
            },
            github: {
                options: {
                    remote: 'git@github.com:ayastreb/11route.git',
                    branch: 'gh-pages'
                }
            }
        },
    });

    grunt.registerTask('deploy', [
        'shell:build',
        'buildcontrol:github'
    ]);

    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-shell');
};
