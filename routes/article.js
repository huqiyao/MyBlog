var sqlCommand=require('./sqlCommand');
var db = require('./basicConnection');
var utils = require('./utils')

function addArticle(req,res,next){
    // var param = req.query || req.params || req.body;
    //content,email
    // var time = new Date();
    var param = req.body;
    console.log(param);
    db.queryArgs(sqlCommand.insertAtc,[param.title,param.tags,param['editor-html-code']],function(err,result) {
        if(!err){
            result={
                code:200,
                msg:'success'
            };
        }else{
            result={
                code:201,
                msg:'err:'+err
            }
        }
        db.doReturn(res,result);

    });
}

function queryAllArticle(req,res,callback) {
    var result = {};
    db.query(sqlCommand.selectAllAtc, function (err, rows) {
        if (!err) {
            result = {
                code: 200,
                msg: 'success',
                articleList: rows,
            }
            console.log(result);

        } else {
            result = {
                code: 201,
                msg: 'err:' + err,
            }

        }
        callback(result);
    });

}

module.exports={
    addArticle:addArticle,
    queryAllArticle:queryAllArticle
}