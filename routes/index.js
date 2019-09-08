var express = require('express');
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
module.exports = router;
