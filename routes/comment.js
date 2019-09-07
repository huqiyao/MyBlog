var sqlCommand=require('./sqlCommand');
var mysql = require('mysql');
var config = require('./dbConfig');
var db = require('./basicConnection');


function addComment(req,res,next){
    var param = req.query || req.params;
    //content,email

    db.queryArgs(sqlCommand.insertCmt,[param.content,param.email],function(err,result) {
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
    addComment:addComment
}