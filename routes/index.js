var express = require('express');
var comment = require('./comment');
var article = require('./article');
var router = express.Router();

var tags = ["灵魂画手？","五行缺王","日益喜欢霓虹国文化","此人学素描和彩铅","喜欢Macrame编制","想去环游世界","浏览了许多美食","前端爱好者","想写服务人民的好工具","……"];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
    tags:tags
  });
});


/* POST manager's Login */
router.post('/manageIndex',function (req,res) {
    if(req.body.username === "Qiyao" && req.body.password === "87654321"){
        res.render('manager/manager-index'); // 不用写路径，因为express默认在views里寻找
    }
})

/* POST comment */
router.post('/leaveWord',function (req,res,next) {

    console.log(req.body)
    comment.addComment(req,res,next);
    // res.send(req.body);
});

router.get('/showArticle', function (req, res) {
    // console.log(req);
    console.log("查询：");
    console.log(req.query);
    article.queryAllArticle(req, res,1,4,function (ret) {
        // res.send(ret);
        console.log(ret);
        console.log(JSON.stringify(req.query) === "{}");
        // res.render('article',ret);
        if(JSON.stringify(req.query) === "{}"){
            ret.server = true;
            console.log("ret是");
            console.log(ret);
            console.log(ret.server === true);
            res.render('article',ret);
        }else{
            ret.server = false;
            res.send(ret);
        }
    });
});

router.get('/toArticleDetail/:id',function (req,res) {
    // res.send(req.params.id);
    // res.render('article-detail',);
    article.getThisArticle(req,res,function (e) {
        console.log(e);
        res.render('article-detail',e);
    })
});

module.exports = router;
