
/*
 * get data from db2, the collection has data after 
 * converting 2 fields to 1, 
 * title description convert to words
 */


const Config = require('../config.js');

var p = console.log;


const find = (txt, opt) =>{
    //p('find in pipe ', Config.url_find);

    // txt: search in field "words", ignore case
    // opt: {skip, limit}

    var j = {
        opt: opt
    }

    if(txt) j.txt = txt;

    return fetch(Config.url_find, {
        method: 'post',
        body: JSON.stringify(j),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        redirect: 'follow',
    }).then(function(response){
        //console.log('find db2 then: ', response);

        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }

        throw new TypeError("Oops to find docs in collection words, we haven't got JSON!");
    });
    
}


//const insertOne = (j) =>{
//    // post a title-description doc into db by fetch, the doc is: j
//
//    return fetch(Config.url_new_words, {
//        method: 'post',
//        body: JSON.stringify(j),
//        headers: new Headers({
//            'Content-Type': 'application/json',
//            'Accept': 'application/json',
//        }),
//        redirect: 'follow',
//    }).then(function(response){
//        console.log('new words inserted? then response keys: ', Object.keys(response));
//
//        var contentType = response.headers.get("content-type");
//        if(contentType && contentType.includes("application/json")) {
//          return response.json();
//        }
//
//        throw new TypeError("Oops, we haven't got JSON!");
//    });
//    
//}


// replace others to do post
const postJson = (url, j) =>{
    // post a title-description doc into db by fetch, the doc is: j

    return fetch(url, {
        method: 'post',
        body: JSON.stringify(j),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        redirect: 'follow',
    }).then(function(response){
        console.log('post json? then response keys: ', Object.keys(response));

        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }

        throw new TypeError("Oops, we haven't got JSON!");
    });
    
}


module.exports.find = find;
module.exports.postJson = postJson;
