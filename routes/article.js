var sqlCommand = require('./sqlCommand');
var db = require('./basicConnection');
var utils = require('./utils');

function addArticle(req, res, next) {
    // var param = req.query || req.params || req.body;
    //content,email
    // var time = new Date();
    var param = req.body;
    console.log(param);
    db.queryArgs(sqlCommand.insertAtc, [param.title, param.tags, param['editor-html-code']], function (err, result) {
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

function queryAllArticle(req, res, callback) {
    var param = req.query || req.params;
    var result = {};
    // 获取前台页面传过来的参数
    var currentPage = parseInt(param.page ? param.page : 1);// 页码
    var pageSize = parseInt(param.num ? param.num : 4); // 显示得条数
    var start = (currentPage - 1) * pageSize;
    db.queryArgs(sqlCommand.selectAllAtc,[pageSize,start], function (err, rows) {
        var totalPage;
        if (!err) {
            totalPage = db.query(sqlCommand.getAtcCount,function(err,num){
                console.log(num);
                return num.count;
            });
            result = {
                code: 200,
                msg: 'success',
                articleList: rows,
                currentPage:currentPage,
                totalPage:totalPage
                // pageSize:pageSize
            };
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

module.exports = {
    addArticle: addArticle,
    queryAllArticle: queryAllArticle
}