'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        jekyll: {
            server : {
                src : 'src',
                dest: '_site',
                server : true,
                server_port : 4000,
                auto : true
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
        'jekyll',
        'buildcontrol:github'
    ]);

    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-build-control');
};
