var express = require('express');
// var path = require('path');
var article = require('./article');
var router = express.Router();

router.get('/showArticleList', function (req, res) {
    // console.log(req);
    console.log(req.query);
    // if(req.query.index === '2'){
    //     article.queryAllArticle(req,res,function (ret) {
    //         ret.index = req.query.index;
    //         res.send(ret);
    //     });
    // }else{
    //     res.send("好像不对欸");
    // }
    article.queryAllArticle(req, res, function (ret) {
        res.send(ret);
    });
});
router.get('/toEdit', function (req, res) {
    res.render('manager/editor');
});
router.post('/postArticle', function (req, res) {
    console.log(req.body);
    article.addArticle(req, res);
});

router.delete('/deleteArticle/:id',function (req,res) {
    article.deleteArticle(req,res);
});

module.exports = router;