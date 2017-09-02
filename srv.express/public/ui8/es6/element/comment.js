
//import React from 'react';
const ReactDOM = require('react-dom');



const wordsObj = require('../../data/one.js');
function addComment(srcObjOrId){
    // srcObj is the target, obj will be the comment to srcObj

    var id = (typeof srcObjOrId === 'string')? srcObjOrId : srcObjOrId.getIdStr();
    var obj = wordsObj.makeWordsObj();
    obj.setAttr('upLinkId', id);


    //// render to id: <main id='main'>..
    ////newWords.render_one_item(obj,... 'main');
    //return ReactDOM.render(
    //        <Comment obj={obj}  />,
    //        document.getElementById('main'));


    //const newWords = require('./words.js');
    //newWords.render_one_item(obj,... 'main');
}

export {Comment, addComment};
