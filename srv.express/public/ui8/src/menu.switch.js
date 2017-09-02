

const listWords = require("./es5ed/list.js");

const words = require('./es5ed/element/words.js');
const wordsObj = require('./data/one.js');
const choose = require('./ui/choose.js');

function setMenuItemSwitch(mState, dataCache){
    mState.on('currentItemSet', ()=>{
        let p = console.log;
        console.log('menu currentItemSet event occured');
        console.log(mState.currentItem);

        switch(mState.currentItem){
            case 'list':
                //p('on event of currentItemSet list, 0827 pm');
                listWords.listContents(dataCache.getObjList(), mState);
                break;
            case 'add':
                //p('on event of ... add, 0827 pm');
                // empty words object

                var obj = wordsObj.makeWordsObj();
                // render to id: <main id='main'>..
                words.render_one_item(obj, dataCache, 'main', mState);
                break;
            case 'read': // read/view one item
                //p('on event of currentItemSet read ');
                // render an item
                // showItem(mState.opt.id, 'main');
                choose.showOneItem(mState.opt.id, dataCache, 'main');
                break;
            case 'comment':
                //p('on event of currentItemSet comment ');
                //choose.comment(mState.opt.id, dataCache, 'main');
                break;
            default:
                p('default, 0827 pm');

        }

    });
}



module.exports.setMenuItemSwitch = setMenuItemSwitch;
