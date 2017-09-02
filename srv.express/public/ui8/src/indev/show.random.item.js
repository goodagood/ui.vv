
const displayOne = require("../es5ed/element/item.viewer.js");
const comm = require("../es5ed/element/comment.js");

function showOneRandom(objList, mState){
    const len = objList.length;

    const index = Math.floor(Math.random()*len);

    displayOne.renderItemViewer(objList[index], objList, 'main', mState);
}

function addOne(mState){
    console.log('test to add, in show random item');
    mState.currentItem = 'add';
}


function randomComment(cached){
    var objList = cached.getObjList();
    const len = objList.length;

    const index = Math.floor(Math.random()*len);

    comm.addComment(objList[index], 'main');
}


// mState is the mState
function demo(cached, mState, millis = 3000){
    //addOne(mState);
    showOneRandom(cached.getObjList(), mState);

    //randomComment(cached);

    //setTimeout(function(){
    //    console.log('delayed demo');
    //    mState.currentItem = 'list';
    //}, millis);
}

module.exports.showOneRandom = showOneRandom;
module.exports.demo = demo;

