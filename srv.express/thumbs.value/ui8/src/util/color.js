
const $ = require("jquery");


function randomColor(){
    $('body').css('color', 'red');
}



module.exports.randomColor = randomColor;
