var sqlCommand = require('./sqlCommand');
var db = require('./basicConnection');
var utils = require('./utils');
var async = require('async');

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
    var pageSize = parseInt(param.num ? param.num : 1); // 显示得条数
    var start = (currentPage - 1) * pageSize;

    var totalData;
    // totalPage = getTotalAtcCount(function(e){
    //     return e;
    // });
    // console.log(totalPage);
    async.waterfall([
            function (cb) {
                db.query(sqlCommand.getAtcCount, function (err, rows) {
                    console.log(rows);
                    totalData = rows[0].count;
                    console.log("总页数："+totalData);
                    cb(null, totalData);
                })
            },
            function (totalPage, cb) {
                db.queryArgs(sqlCommand.selectAllAtc, [pageSize, start], function (err, rows) {
                    if (!err) {
                        result = {
                            code: 200,
                            msg: 'success',
                            articleList: rows,
                            currentPage: currentPage,
                            totalData: totalPage
                            // pageSize:pageSize
                        };
                        console.log(result);
                    } else {
                        result = {
                            code: 201,
                            msg: 'err:' + err,
                        }

                    }
                    cb(null, result);
                    // callback(result);
                });
            }
        ],
        function (err,ret) {
            callback(ret);
        }
    );
}


module.exports = {
    addArticle: addArticle,
    queryAllArticle: queryAllArticle
}