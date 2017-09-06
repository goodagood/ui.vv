
var glob = require("glob");


var p = console.log;


function findit(glob_pattern, callback){
    glob(glob_pattern, callback);
}

function find1st (glob_pattern, callback){
    findit(glob_pattern, function(err, files){
        if (err) return callback(err);
        if (files.length < 1) return callback(`not found, find1st: ${glob_pattern}`);

        callback(null, files[0]);
    });
}



if(require.main === module){
    p('oo');
}

module.exports.findit = findit;
module.exports.find1st = find1st;
