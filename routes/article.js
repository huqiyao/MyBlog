var sqlCommand=require('./sqlCommand');
var db = require('./basicConnection');


function addArticle(req,res,next){
    // var param = req.query || req.params || req.body;
    var param = req.body;
    //content,email
    console.log(param);
    db.queryArgs(sqlCommand.insertAtc,[param.title,param.tags,param.editor-html-code],function(err,result) {
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

module.exports={
    addArticle:addArticle
}