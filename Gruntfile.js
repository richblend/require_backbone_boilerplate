// Wrapper function with one parameter
module.exports = function(grunt) {
	// This banner gets inserted at the top of the generated files, such a minified CSS
	var bannerContent = '/*!\n' +
						' * <%= pkg.name %>\n'+
						' * Version: <%= pkg.version %>\n'+
						' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n'+
						' */\n\n';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		clean: ['tmp', 'dist/js'],
		

		jshint: {
			files: ['src/js/*.js'],
			options: {
				forin: true,
				noarg: true,
				noempty: true,
				eqeqeq: true,
				bitwise: true,
				undef: true,
				unused: true,
				curly: true,
				browser: true,
				devel: true,
				jquery: true,
				indent: true,
				maxerr: 25
				
			},
		},


		concat: {
			options: {
				banner: bannerContent
			},
			
			/* Build any vendor scrips we feel appropriate into one file vendor.js. Order is specified */
			vendor: {
				src: [
	
					'bower_components/jquery/dist/jquery.js',
					'bower_components/underscore/underscore.js',
					'bower_components/backbone/backbone.js'
				],
				dest: 'tmp/js/vendor/vendor.js'
			}
			
			
			
		},


		copy: {
			
			build: {
				files: [
					/* copy the require.js file on its own */
					{src: 'bower_components/requirejs/require.js', dest: 'dist/js/vendor/require.js'},
					/* copy the optimised/concatenated AMD modules */
					{src: 'tmp/js/main.js', dest: 'dist/js/main.js'},
					/* copy modernizr file on its own, as it cant be concatenated witjh other vendor files */
					{src: 'bower_components/modernizr/modernizr.js', dest: 'dist/js/vendor/modernizr.js'}
					
				]
			},

			run: {
				files: [
					/* copy the require.js file on its own */
					{src: 'bower_components/requirejs/require.js', dest: 'dist/js/vendor/require.js'},
					/* copy the raw AMD modules - slightly more complicated syntax here to preserve the folder structure nicely */
					{cwd: 'src/js', src: '**/*', dest: 'dist/js', expand: true},
					/* copy modernizr file on its own, as it cant be concatenated witjh other vendor files */
					{src: 'bower_components/modernizr/modernizr.js', dest: 'dist/js/vendor/modernizr.js'},
					/* copy concatenated (but not uglified) vendor files */
					{src: 'tmp/js/vendor/vendor.js', dest: 'dist/js/vendor/vendor.js'}
				]
			}
			
		},


		requirejs: {
			compile: {
			    options: {
		         	appDir: "src/js/",
		         	baseUrl: ".",
		         	dir: "tmp/js",
		         	modules: [{name: 'main'}]
		          
		        }
		  	}
		},


		uglify: {
			vendor : {
				src : 'tmp/js/vendor/vendor.js',
				dest : 'dist/js/vendor/vendor.js'
			}
		},

		'string-replace': {
			dist: {
				files: {
					'dist/index.html': 'src/index.html'
				},
				options: {
					replacements: [
						{
							pattern: /%timestamp%/g,
							replacement: new Date().getTime()
						}
					]
				}
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: false
				},
				files: {
					'dist/css/main.css': 'src/scss/main.scss',
				}
			}
		},

		autoprefixer: {

		    options: {
		      // Task-specific options go here.
		    },

		    // prefix the specified file
		    single_file: {
				options: {
					// Target-specific options go here.
				},
				src: 'dist/css/main.css',
      			dest: 'dist/css/main.css'
      		}
		},


		cssmin: {
			
			target : {
				src : ['dist/css/main.css'],
				dest : 'dist/css/main.css'
			}
		},


		watch: {
			sass: {
				files: ['src/scss/*.scss'],
				tasks: ['sass', 'autoprefixer'],
			},
			scripts: {
				files: ['src/js/*.js'],
				tasks: ['clean', 'requirejs', 'concat', 'copy:run', ],
			},
			html: {
				files: ['src/*.html'],
				tasks: ['string-replace']
			}
		},


		connect: {
		    server: {
		      options: {
		        keepalive: true,
		        port: 9001,
		        base: 'dist'
		      }
		    }
		  }


	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');


	/* available tasks :

		- build: Do the final build.
		- run: Do a dev build
		- watch: Same as dev build
		- serve: Run local server on 9001

	*/
	

	
	grunt.registerTask('build', [
		//clean tmp + dist/js directories
		'clean', 
		//run the require optimiser (which copies the optimised module files into tmp)
		'requirejs', 
		//concatenate other vendor files (probably mostly from bower_components) into one file and copy that to tmp
		'concat', 
		//copy required files (ones that are already minified) from tmp to dist
		'copy:build', 
		//uglify other files (that also need minification) to dist
		'uglify',
		//copy index.html to dist while doing some str replaces on it
		'string-replace',
		//compile sass
		'sass',
		//add vendor prefixes to compiled css files
		'autoprefixer',

		'cssmin'
		
	]);

	

	grunt.registerTask('run', [
		//clean tmp + dist/js directories
		'clean', 
		//copy all AMD modules into dist 
		'concat', 
		//concatenate other vendor files into one file and copy that to dist
		'copy:run',
		//copy index.html to dist while doing some str replaces on it
		'string-replace',
		//compile sass
		'sass',
		//add vendor prefixes to compiled css files
		'autoprefixer'
	]);

	grunt.registerTask('serve', [
		'connect'
	]);

};