
const $ = require('jquery');

const BLACK = '#000000';
const WHITE = '#FFFFFF';

var csse = require("./ui/css.color.eclipse.js");


function colorDefault(scheme){
    fbeach('body',  BLACK, WHITE);
    fbeach('.logo',  csse['h5']['color'], csse['h5']['background-color']);
    fbeach('h1',  csse['h1']['color'], csse['h1']['background-color']);
}

function color_one(scheme){
    fbeach('body',  WHITE, BLACK);
    fbeach('.logo', '#348686', '#424242');
    fbeach('i',     '#9E5A77', '#AFAFD4');
    fbeach('b',     '#191919', '#735b9c');
    fbeach('p',     '#ffffff', '#000000');
    fbeach('pre',   '#ffffff', '#000000');
    fbeach('div',   '#ffffff', '#000000');

    fbeach('fa',    'green', '#000000');
}



/*
 * foreground background color for each by selector
 */
function fbeach(selector, foreground, background){
    $(selector).each(function(){$(this).css('color', foreground);});
    $(selector).each(function(){$(this).css('background-color', background);});
}


/*
 * foreground background color for the selected by tag id
 */
function fbid(idSelector, foreground, background){
    $(idSelector).css('color', foreground);
    $(idSelector).css('background-color', background);
}




//?
//?       normal           Bright
//?   black=#424242    black=#4E4E4E
//?     red=#9E5A77      red=#CC6291
//?   green=#348686    green=#65B5B5
//?  yellow=#8F8FA9   yellow=#AFAFD4
//?    blue=#4a6985     blue=#5B8EBF
//? magenta=#735B9C  magenta=#9378BE
//?    cyan=#42799D     cyan=#74A7CA
//?   white=#9BACB0    white=#CBCBCB



module.exports.color = colorDefault;
module.exports.fbeach   = fbeach  ;
