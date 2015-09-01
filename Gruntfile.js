'use strict';

var path = require('path');

var lrSnippet  = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function(connect, dir) {
  return connect.static(path.resolve(dir));
};


module.exports = function (grunt) {

    //config task
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcBase: "src",
        buildBase: "build",
        tempBase: "temp",
        copy: {
            main: {
                expand: true,
                cwd: '<%= srcBase %>',
                src: ['**', '!demo/*'],
                dest: '<%= buildBase %>'
            }
        },

        uglify: {
            options: {
                sourceMap: false
            },
            build: {
                expand: true,
                cwd: '<%= buildBase %>',
                src: ['**/*.js', '!**/lib/*','!**/bz/*'],
                dest: '<%= buildBase %>',
                rename: function (dest, src) {
                    return dest + '/' + src.replace(/(-debug.js)/ig, '.js');
                }
            }
        },
        clean: {
            empty: {
                src: "<%= buildBase %>"
            }
        },
        watchify: {
            options: {
                debug: true
            },
            src: {
                src: 'src/components/*',
                dest: 'src/bundle.js'
            }
        },

        watch: {
            src: {
                files: 'src/components/*.html',
                options: {
                    livereload: true
                },
                tasks:['componentTojs','browserify']
            }
        },

        connect: {

            options: {
                port: 6789,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                  middleware: function (connect) {
                    return [
                      lrSnippet,
                      mountFolder(connect, 'src')
                    ];
                  }
                }
            }
        },
        browserify:{
            dist:{
                files:{
                    "src/bundle.js":['src/components.js']
                },
                options:{
                    browserifyOptions:{
                        standalone:'rComponents'
                    }
                }
                
            }
        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    var fs = require('fs');
    var rcu = require('rcu');
    var builders = require('rcu-builders');
    var Ractive = require('ractive');
    rcu.init( Ractive );

    grunt.registerTask('componentTojs',null,function(){
        fs.readdirSync( 'src/components' ).forEach( function ( htmlFile ) {
        var html = fs.readFileSync( 'src/components/' + htmlFile,'utf8').toString();

        var component = rcu.parse( html );

        // now, we create a JavaScript module
        var commonJs = builders.cjs( component );
        fs.writeFileSync( 'src/compiled-components/' + htmlFile.replace( '.html', '.js' ),commonJs );
        });
    });

    grunt.registerTask('default', ['componentTojs','browserify','connect','watch']);
    grunt.registerTask('build',['clean', 'copy','uglify'])

}