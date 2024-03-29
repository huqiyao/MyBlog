var express = require('express');
// var path = require('path');
var article = require('./article');
var router = express.Router();

router.get('/showArticleList', function (req, res) {
    // console.log(req);
    console.log(req.query);
    article.queryAllArticle(req, res,1,3, function (ret) {
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

router.get('/manager/toUpdate/:id',function (req,res) {
    article.getThisArticle(req,res,function (e) {
        console.log("e是：");
        console.log(e);
        res.render('manager/update',e);
        // res.send(e);
    })
    // res.send(req.params.id);
});

router.post('/updateArticle/:id',function (req,res) {
    article.updateArticle(req,res);
});
module.exports = router;