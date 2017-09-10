
const React = require('react');
const ReactDOM = require('react-dom');

//const ReactDOM = require('react-dom');
//const rd = require('react-dom');

const $ = require('jquery');

const Menu = require('./es5ed/menu.js');


//const testBabel = require("./rct/ra.js");


$(document).ready(function(){

    var mState = require('./data/menu.state.js');

    function menuCallback(name){
        //console.log('a.js menu callback : ', name);
        mState.currentItem = name;
    }

    Menu.renderNavMenu(mState.context, menuCallback);

    const clist = require("./data/content.list.js");
    var cached = clist.prepare_cache();

    const mSwitch = require("./menu.switch.js");
    mSwitch.setMenuItemSwitch(mState, cached);
    
    const listWords = require("./es5ed/list.js");

    cached.fetch().then(function(o){
        var objList = cached.getObjList();
        window.c = cached;
        window.ol = objList;
        //listWords.listContents(cached.getObjList(), mState);


        //const viewer = require("./es5ed/element/item.viewer.js");
        const demo = require("./indev/show.random.item.js");
        demo.demo(cached, mState);

        //mState.currentItem = 'list';

        //indev del asap
        
        window.ms = mState;
        window.d = cached.getData();
        //arr.forEach((d)=>{console.log(d._id);});
    });
    

    const color = require("./color.js");
    setTimeout(function(){
        color.color();
    }, 5000);

    if(!window.$) window.$ = $;
    window.fb = color.fbeach;

    console.log('last line .');
});


// checkings

function check_getwords(olist){
    var i, len;
    len = olist.length;
    for(i=0; i<len; i++){
        oi = olist[i];
        if(typeof oi.getWords !== 'function'){
            console.log(oi.getData());
        }
    }
};window.cgw = check_getwords;
