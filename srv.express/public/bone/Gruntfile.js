
// I am stupid, can't use grunt
// 2017 0926

module.exports = function(grunt) {
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    //pkg: grunt.file.readJSON('/home/za/workspace/ui.vv/srv.express/package.json'),
    browserify: {
        src: ['src/test.a.js'],
        dest: 'dist/test.js'
    },
    watch: {
      files: 'src/test.a.js',
      tasks: ['default']
    }
  });


  grunt.loadNpmTasks('grunt-browserify');
  //grunt.loadNpmTasks('browserify');

  //grunt.registerTask('default', ['grunt-browserify', 'watch']);
  grunt.registerTask('default', ['browserify', 'watch']);

}
