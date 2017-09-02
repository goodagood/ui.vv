
/*
 * data:
 * {
 *  up:
 *  {
 *   username: {milli: 13xxxdigits milli seconds of click},
 *   ...
 *  },
 *  down:
 *  {
 *  },
 * }
 *
 * One task is we need to know current user name.
 * One thumb === one value
 */

const Promise = require('bluebird');


//import {fakeThumbAction} from 'src/util/pipe.js';

const fakeThumb = require("./fake.thumbs.js");


function prepare_thumbs(_id, thumbsData){

    let _thumbs = {up:{}, down:{}};
    let _obj  = {};

    function setThumbs(data){
        // data should be an object.
        if(!data) throw "set _thumbs get no data";

        if(! data.up ) data.up = {};
        if(! data.down ) data.down = {};

        _thumbs = data;
    }

    if(thumbsData) setThumbs(thumbsData);


    function getThumbs(){ return _thumbs; }

    function getId(){ return _id; }

    // for huge thumbs up set, 
    // it's not ok to do it this way, 
    // because only part of data will be past to client side/here.
    function number_of_up_thumbs(){
        return Object.keys(_thumbs.up).length;
    }

    function number_of_down_thumbs(){
        return Object.keys(_thumbs.down).length;
    }

    // should return promise
    function addThumb(isUp){
        var j = {"id": _id, isUp: isUp};

        return fakeThumb(j).then(function(ret){
            //console.log('do add thum, fake..', ret);
            //if(ret.id !== _id) throw 'return thumb got DIFFERENT id';

            setThumbs(ret.thumbs);
            return _obj;
        });
    }

    function showSimple(){
        var tmp = {};
        tmp["id"] = _id;
        tmp.up = Object.keys(_thumbs.up).length;
        tmp.down = Object.keys(_thumbs.down).length;

        console.log(tmp);

        return tmp;
    }


    _obj.setThumbs = setThumbs;
    _obj.getThumbs = getThumbs;
    _obj.getId = getId;
    _obj.number_of_up_thumbs = number_of_up_thumbs;
    _obj.number_of_down_thumbs = number_of_down_thumbs;
    _obj.addThumb = addThumb;
    _obj.showSimple = showSimple;

    return _obj;
}


//let ThumbsObj = prepare_thumbs();


module.exports.prepare_thumbs = prepare_thumbs;
