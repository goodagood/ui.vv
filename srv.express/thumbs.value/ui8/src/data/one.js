
//import {prepare_thumbs} from './thumbs.js';

const pipe = require('./pipe.js');
const thumbs = require('./thumbs.js');
const Config = require('../config.js');

const p = console.log;


function makeWordsObj(data){

    //data
    var _d;

    if (data){
        _d = data;
        if(!(_d.id && _d._id)) _d.id = _d._id.toString();
    }else{
        _d = {
            words: null,
            // contribute2: username,
            thumbs: {up:{}, down:{}},
            milli: Date.now(),
        };
    }

    let _o = {}; //obj using the data
    let _oThumbs = null; // Thumbs object

    let p = console.log;

    // use src/util/pipe.js, we don't need url anymore
    let url = null; // the url accept json from fetch api

    let timer = {
        'id-timeout': null,
        'milli': -1, // 'the milli-seconds set by setTimeout
        'delay': 5000, // 5 seconds
    }


    _o.getData = ()=>{ return _d; };

    _o.setData = (data)=>{
        _d = data;
        _d['milli'] = Date.now().toString();

        if(_d._id && !_d.id) _d.id = _d._id.toString();

        prepare_thumbs_obj();

    };

    function prepare_thumbs_obj(){
        if(_d.thumbs){
                _oThumbs = thumbs.prepare_thumbs(getIdStr(), _d.thumbs);
                return _oThumbs;
        }
        return null;
    }

    function getIdStr (){
        if(!_d.id) _d.id = _d._id.toString();

        if(!_d.id) return null;
            
        return _d.id;
    };


    _o.print = ()=>{ console.log(_d); };

    function getThumbsObj(){
        if(_oThumbs) return _oThumbs;

        return this.prepare_thumbs_obj();
    }


    const setChangeMill = ()=>{ _d['milliChange'] = Date.now(); };
    const setSaveMill = ()=>{ _d['milliSave'] = Date.now(); };


    _o.getAttr = (key)=>{ return _d[key]; };
    _o.setAttr = (key, value)=>{ _d[key] = value; setChangeMill(); };

    //_o.setUrl = (u)=>{ url = u; };
    //_o.getUrl = ()=>{ return url; };

    _o.assign = (obj)=>{ Object.assign(_d, obj); setChangeMill(); };

    _o.validate = ()=>{
        if(_d['words'] === null) return false;

        if(typeof _d.words !== 'string') return false;
        if(_d.words.length < 1) return false;

        return true;
    }


    function save_new_obj(){
        return pipe.postJson(Config.url_new_words, _d).then(function(jdata){
            let id = jdata.id || jdata._id.toString();

            _d.id = id;
            p('saved 1, ', Config.url_new_words, jdata);

            setSaveMill();
            return jdata; // json data
        });
    }

    function save_old_obj(){
        return pipe.postJson(Config.url_update_words, _d).then(function(updateResult){
            setSaveMill();
            p('saved 2, ', Config.url_update_words, updateResult);
            return updateResult;
        });
    }


    // return promise
    _o.save = ()=>{
        if(!_d['id']){
            return save_new_obj();
            //return pipe.postJson(Config.url_new_words, _d).then(function(jdata){
            //    let id = jdata.id || jdata._id.toString();

            //    _d.id = id;
            //    p('saved 1, ', Config.url_new_words, jdata);

            //    setSaveMill();
            //    return jdata; // json data
            //});
        }else{
            return save_old_obj();
            //return pipe.postJson(Config.url_update_words, _d).then(function(updateResult){
            //    setSaveMill();
            //    p('saved 2, ', Config.url_update_words, updateResult);
            //    return updateResult;
            //});
        }
    }


    /*
     * timer : {
     *      milli-seconds: ,
     *      id-timeout: set by setTimeout
     * }
     */
    _o.saveLater = ()=>{
        let milli = Date.now();

        if(timer && timer['milli']){
            if( milli < timer['milli']){
                clearTimeout(timer['id-timeout']);
            }
        }

        timer['id-timeout'] = setTimeout(_o.save, timer['delay']);
        timer['milli'] = milli + timer['delay'];
    };


    _o.getWords = ()=>{
        if(! _d['words']){
            console.log('nothing in words, you got suprised, can we have no words?');
            console.log(_d['id'], _d.milli);
            return 'suprise, can we have no words?';
            //throw `why nowords? ${getIdStr()}`;
        }
        return _d['words'];
    }

    _o.setWords = (words)=>{
        _d['words'] = words;
        setChangeMill();
        _o.saveLater();
    };

    _o.getThumbsObj = getThumbsObj;
    _o.prepare_thumbs_obj = prepare_thumbs_obj;
    _o.getIdStr = getIdStr;


    return _o;
}




module.exports.makeWordsObj = makeWordsObj;


// checking

function cbasic(){
    let obj = makeWordsObj();

    let data = {
        'title': 'this is title',
        'description': 'thi sis descr.',
        'milli': Date.now().toString(),
    };
    obj.print(obj.getData());
    obj.setData(data);
    obj.print();

    obj.print(obj.getData());

    obj.setUrl('/the.url.give.josn.post');
    console.log(obj.getUrl())
}


if(require.main === module){
    cbasic();
}
