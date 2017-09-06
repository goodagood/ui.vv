
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
  res.send('routes for sysvalue, in ui.vv srv.express thumbs.value sysvalue.js ');
});

router.get('/index', function (req, res) {
    var indexhtml = path.join(__dirname, "ui8/dist/index.html");
    p('index html: ', indexhtml);
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


//router.get('/globit/:filename(.+)', function(req, res) {...})
router.get(/globit\/(.+)/, function(req, res) {
    var filename = req.params[0];

    console.log('req.params: ', req.params);
    console.log(filename);

    // Don't let them peek at /etc/passwd
    if (filename.indexOf('..') === -1) {

        findit.find1st(filename, function(err, foundname){
            if(err){
                console.log(err);
                res.status = 404;
                return res.send('Not Found 0906 1448');
            }


            //let filepath = path.join(path.dirname(__dirname), foundname);
            let filepath = path.join(__dirname, foundname);

            fs.realpath(filepath, function(err, realpath){

                if(err) {
                    res.status = 404;
                    return res.send('Not Found, 0906 1641');
                }


                console.log('foundname: ', foundname);
                console.log('__dirname: ', __dirname);
                console.log('file path: ', filepath);
                console.log('real path: ', realpath);

                return res.sendFile(realpath);
            });

        });

    }
    else {
        console.log('Not Found, .. might be there: ', filename);
        res.status = 404;
        return res.end('Not Found, .. 0906 1705 ');
    }
});


router.get(/sendfile\/(.+)/, function(req, res, next) {
    var filename = req.params[0];

    console.log('send file req.params: ', req.params);
    console.log('filename: ', filename);
    console.log('yes, you are here');

    //fuck


    // Don't let them peek at /etc/passwd
    if (filename.indexOf('..') === -1) {

        var filepath = path.join(__dirname, filename);
        var resopath = path.resolve(filepath);

        console.log("THE stupid thing is code never run here!!");

        console.log('filepath: ', filepath);
        console.log('resopath: ', resopath);

        return res.sendFile(resopath, {}, function(err){
            if(err){
                let errStr = err.toString();
                console.log(`send file err, 0906 1748 ${errStr}`);
                throw errStr ;
            }
            next();
        });
    }
    else {
        console.log('0906 1740 Not Found, .. might be there: ', filename);
        res.status = 404;
        return res.end('Not Found, .. 0906 1705 ');
    }
});




//// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
//  console.log('Time: ', Date.now())
//  console.log('req url: ', req.url)
//  next()
//})

module.exports = router;
