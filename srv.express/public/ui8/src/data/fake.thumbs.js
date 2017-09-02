
// function: fake thumb,
// it get json input: {id: document id (string) in mongodb
//                     isUp: true for thumbsup, false for thumbsdown}

const Config = require("../config.js");

module.exports = fakeThumb;

function fakeThumb(jsonData){
    
    // post a thumb up OR down action to backend.
    // user name should be determined by the backend.
    // jsonData: 
    // {
    //   idstr: 'string of record id',
    //   isUp:  'true for thumb up, false else
    // }

    console.log('fakeThumb: ', Config.url_fake_thumb);
    if(!Config.url_fake_thumb) throw 'no url to fake thumb';

    return fetch(Config.url_fake_thumb, {
        method: 'post',
        body: JSON.stringify(jsonData),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        redirect: 'follow',
    }).then(function(response){
        //console.log('then: ', response);
        //console.log('then obj keys: ', Object.keys(response).join(", "));

        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }else{
            throw new TypeError("Oops, we haven't got JSON! fake.thumbs.js");
        }

    });

};






