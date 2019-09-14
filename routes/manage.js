var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/userStatus',function (req,res) {
    // console.log(req);
    console.log(req.query);
    if(req.query.index === '2'){
        // res.setHeader('Content-Type', 'text/html');
        // res.sendfile('../public/partials/article-tmpl.html');
        // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
        // res.sendFile(path.join(__dirname, '../public/partials', 'article-tmpl.html'));
        res.send({
            name:'文章'
        })
    }else{
        res.send("好像不对欸");
    }
});

module.exports = router;