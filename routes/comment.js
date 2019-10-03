var sqlCommand = require('./sqlCommand');
var mysql = require('mysql');
var config = require('./dbConfig');
var db = require('./basicConnection');
var utils = require('./utils');


function addComment(req, res, next) {
    // var param = req.query || req.params || req.body;
    var param = req.body;
    //content,email
    console.log(param);
    db.queryArgs(sqlCommand.insertCmt, [param.content, param.email, param.articleId, param.lastCmt], function (err, result) {
        if (!err) {
            result = {
                code: 200,
                msg: 'success'
            };
        } else {
            result = {
                code: 201,
                msg: 'err:' + err
            }
        }
        db.doReturn(res, result);
    });
}

function queryAllComment(req, res, callback) {
    var id = req.params.id;
    console.log("id是："+id);
    var result = {};
    db.queryArgs(sqlCommand.getAllCmt,id, function (err, rows) {
        rows.forEach(item => {
            item.time = utils.formatTime(item.time);
        });
        if(!err){
            result = {
                code: 200,
                msg: 'success',
                commentList: rows,
            }
        }else{
            result = {
                code: 201,
                msg: 'err:' + err,
            }
        }
        callback(result);
    })
}

module.exports = {
    addComment: addComment,
    queryAllComment:queryAllComment
}