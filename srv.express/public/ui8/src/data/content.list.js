
/*
 * manage a list/set of title-description objects
 */

var _ = require('lodash');
const random = _.random;

var Promise = require( 'bluebird');

var oWords = require("./one.js");

var pipe = require("./pipe.js");

//var {getTopRecords} from 'src/util/pipe.js');
//var {getTitleDescriptionObj} from './td.obj.js');


//var {until, checkUntil} from 'src/util/time.js');

const p = console.log;


function prepare_cache(){

    // data in closure

    let d = {}; // the data
    d.fetched = false;

    // list of json from mongodb
    d.a   = [];
    // list of object corresponding to the json
    d.objs= [];
    d.objDict= {};

    // obj using the data
    let o = {};

    // end of data


    function fetch(offset=0, limit=100) {
        return pipe.find(null, {skip: offset, limit: limit}).then(function(arr){
            d.a = arr;
            d.fetched = true;

            p('fetched length: ', d.a.length);

        }).then(()=>{
            // make all data to object
            d.a.forEach(function(data){
                //var one = null; //oWords.makeWordsObj(data);
                var one = oWords.makeWordsObj(data);
                //console.log(td.id || td._id);

                //one.setData(td);
                d.objs.push(one);

                if(typeof data.id !== 'string') throw 'assert?';
                d.objDict[data.id] = one;
            });
            return o;
        });
    }

    o.fetch = fetch;

    function getData(){
        return d;
    }

    function getObjList(){ return d.objs; }

    function getObjById(id){ return d.objDict[id]; }

    function randomTopTD(){
        if(!d.fetched) return null;

        let leng = d.a.length;
        let ind = random(leng); // lodash random

        //console.log(d.objs[ind]);
        return d.objs[ind];
    }

    function getWordsObjById(idStr){
        if(!d.fetched) return null;

        var i;
        for (i=0; i<d.objs.length; i++){
            let one = d.objs[i];
            let oneId = one.getIdStr();

            if(oneId === idStr){
                //console.log('find the title description obj, ', idStr, oneId);
                return one;
            }
        }
        return null;
    }


    function isFetched(){
        return d.fetched;
    }

    function waitFetched(){
        return checkUntil(isFetched, 100, 20*1000).then(function(ok){
            if(ok){
                return o;
            }else{
                // not ok, but time limit past.
                return null;
            }
        });
    }
    
    function waitRandomTopTD(){
        return until(randomTopTD, 100, 20*1000);
    }

    function addObj(oneObj){
        // add an object to data

        var Id = oneObj.getIdStr();
        if(typeof Id !== 'string') throw '1952pm29 without id?';

        if(! (Id in d.objDict)){
            d.objs.push(oneObj);
            d.objDict[Id] = oneObj;
        }
    }

    o.randomTopTD = randomTopTD;
    o.waitFetched = waitFetched;
    o.waitRandomTopTD = waitRandomTopTD;
    o.getWordsObjById = getWordsObjById;
    o.getData = getData;
    o.getObjList = getObjList;
    o.getObjById = getObjById;
    o.addObj = addObj;


    //o.fetch();
    return o;
}


let cached = prepare_cache();

module.exports.cached = cached;
module.exports.prepare_cache  = prepare_cache;
