var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST manager's Login */
router.post('/manageIndex',function (req,res) {
    if(req.body.username === "Qiyao" && req.body.password === "87654321"){
        res.render('manager/manager-index'); // 不用写路径，因为express默认在views里寻找
    }
})
module.exports = router;
