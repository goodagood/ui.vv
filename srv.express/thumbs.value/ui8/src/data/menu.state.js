

const EventEmitter = require('events');

class MenuState extends EventEmitter {
    constructor(){
        super();
        this.data = {
            'default':{add: 'Add', list:'List', help: 'Help'},
            'context':{add: 'Add', list:'List'},
            'currentItem':'Current Menu',
            'opt': {},

            'context4read': {oo: 'OOO', list: 'List', add: 'Add', help: 'Help'},
            'context4edit': {},
            'context4list': {},

        };
    }

    get default(){ return this.data.default; }

    get context(){ return this.data.context; }
    set context(contextDict){
        this.data.context = contextDict;
        this.emit('contextSet');
    }
    get currentItem(){ return this.data.currentItem; }
    set currentItem(nameOfCurrentMenuItem){
        this.data.currentItem = nameOfCurrentMenuItem;
        this.emit('currentItemSet');
    }

    get opt(){ return this.data.opt; }
    set opt(opt){
        this.data.opt = opt;
    }

    getMenuData (){ return this.data; }
}

var mState = new MenuState();

const list = require("./content.list.js");


const menu = require('../es5ed/menu.js');

mState.on('contextSet', ()=>{
    //console.log('menu context event occured');
    //console.log(mState.context);
    menu.renderNavMenu(mState.context, console.log);
});


module.exports = mState;


// checkings

//mState.on('contextSet', ()=>{
//    console.log('2, menu context event occured');
//})
//mState.on('currentItemSet', ()=>{
//    console.log('2, menu currentItemSet event occured');
//})



if(require.main === module){
    let p = console.log;
    p(Object.keys(de));
    //p(Object.keys(emitter));
    de.emit('demoEvent');
    de.emit('contextChanged');
    console.log(de.nav);
}
