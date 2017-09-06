

const EventEmitter = require('events');

class Data extends EventEmitter {
    constructor(){
        super();
        this.data = {
            nav: {
                'default':{add: 'Add', list:'List', help: 'Help'},
                'context':{add: 'Add', list:'List'},
                'current':'Current Menu',
                'opt': {},
            },

            color: {},
            config: {},

        };
    }

    get defaultMenu(){ return this.data.nav.default; }

    get context(){ return this.data.nav.context; }
    set context(contextDict){
        this.data.nav.context = contextDict;
        this.emit('contextSet');
    }
    get currentItem(){ return this.data.nav.current; }
    set currentItem(nameOfCurrentMenuItem){
        this.data.nav.current = nameOfCurrentMenuItem;
        this.emit('currentItemSet');
    }

    get opt(){ return this.data.nav.opt; }
    set opt(opt){
        this.data.nav.opt = opt;
    }
}

var data = new Data();



const menu = require('../es5ed/menu.js');

data.on('contextSet', ()=>{
    console.log('menu context event occured');
    //console.log(data.nav.context);
    menu.renderNavMenu(data.context, console.log);
});


module.exports = data;


// checkings

//data.on('contextSet', ()=>{
//    console.log('2, menu context event occured');
//})
//data.on('currentItemSet', ()=>{
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
