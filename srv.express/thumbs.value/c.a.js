
var glob = require("glob");

var findit = require("./findit.js");

var p = console.log;


//// options is optional
//var options = {};
//glob("**/c*.js", options, function (er, files) {
//  // files is an array of filenames.
//  // If the `nonull` option is set, and nothing
//  // was found, then files is ["**/*.js"]
//  // er is an error object or null.
//
//
//    if(er) return console.log(er);
//
//    console.log(files);
//});



function cone(){
    var filename = '**/man*';
    var filename = '**/ui8/dist/index.js';
    var filename = "**/ui8/dist/index.css";

    //var filename = "**/bootstrap/dist/css/bootstrap.min.css";
    //var filename = "**/font-awesome/css/font-awesome.min.css";


    findit.findit(filename, function(err, files){
        if(err) return p(err);

        p(files);
    });
}

if(require.main === module){
    p('oo');
    cone();
}
