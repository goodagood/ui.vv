
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var _ = require("lodash");

var findit = require('./findit.js');

var crud = require('./db.mongo/db2.crud.js');
var db2fake = require('./db.mongo/db2.fake.js');

var p = console.log;



router.get('/', function (req, res) {
  var distPath = path.join(__dirname, 'dist');
  res.send(`routes for sysvalue,
          in ui.vv srv.express
          thumbs.value sysvalue.js
          <h1> ${distPath} </h1>
          `);
});

router.get('/index', function (req, res) {
    //var indexhtml = path.join(__dirname, "ui8/dist/index.html");

    var indexhtml = path.join(__dirname, "index.html");
    //p('index html: ', indexhtml);

  res.sendFile(indexhtml);
});

//todo check
router.post('/find', function (req, res) {
    console.log('/find: ', req.body);

    var filter = {};
    if ('txt' in req.body){
        // ignore case search in field 'words'
        filter = {'words': {'$regex': RegExp(req.body.txt, 'i')}};
    }

    // skip, limit
    var opt = 'opt' in req.body? req.body.opt : {};

    crud.find(filter, opt).then(function(cur){
        cur.toArray(function(err, arr){
            if(err) return res.json({err: err});

            res.json(arr);
        });
    });
});

router.post('/new.words', function (req, res) {
    console.log('/new.words: ', req.body);

    if (!'words' in req.body){
        return res.json({err: 'no words in request'});
    }

    // skip, limit
    var opt = 'opt' in req.body? req.body.opt : {};

    crud.insertDoc(req.body).then(function(retJson){
        // retJson: {id: string, op: the record from mongodb}
        res.json(retJson);
    });
});


router.post('/update', function (req, res) {
    console.log('/update: ', req.body);

    if (!('words' in req.body)){
        return res.json({err: 'no words in request'});
    }
    if (!('id' in req.body)){
        return res.json({err: 'no db id in request'});
    }

    crud.updateWords(req.body).then(function(retJson){
        // retJson: {result, message, ...}
        if('result' in retJson) return res.json(retJson.result);

        res.json(retJson);
    });

});



router.post('/fake.thumb', function (req, res) {
    console.log('db2/fake.thumb: ', req.body);

    db2fake.fakeAddThumb(req.body.id, req.body.isUp).then(function(backJson){
        console.log(backJson);
        res.json(backJson);
    });

});


// server static files in this folder: ./file/image.jpg
router.get(/file.+/
        ,function(req,res,next){
            console.log('making this folder static also');
            console.log('url: ', req.url);
            req.url = req.url.slice('/file'.length);
            console.log('chopped url: ', req.url);
            next();
        }
        ,express.static(__dirname)
);



//// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
//  console.log('Time: ', Date.now())
//  console.log('req url: ', req.url)
//  next()
//})

module.exports = router;
