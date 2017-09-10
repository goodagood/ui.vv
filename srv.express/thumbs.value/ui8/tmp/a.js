
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
        console.log('a.js menu callback : ', name);
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
        //listWords.listContents(cached.getObjList(), mState);


        //const viewer = require("./es5ed/element/item.viewer.js");
        const demo = require("./indev/show.random.item.js");
        demo.demo(cached, mState);

        //mState.currentItem = 'add';

        //indev del asap
        //
        //window.c = cached;
        //window.ms = mState;
        //window.d = cached.getData();
        //arr.forEach((d)=>{console.log(d._id);});
    });
    

    console.log('last line .');
});

