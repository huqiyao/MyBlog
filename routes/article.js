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
    var pageSize = parseInt(param.num ? param.num : 3); // 显示得条数
    var start = (currentPage - 1) * pageSize;

    var totalPage;
    // totalPage = getTotalAtcCount(function(e){
    //     return e;
    // });
    // console.log(totalPage);
    console.log(currentPage);
    async.waterfall([
            function (cb) {
                db.query(sqlCommand.getAtcCount, function (err, rows) {
                    console.log(rows);
                    totalPage = Math.ceil(rows[0].count/3);
                    console.log("总页数："+totalPage);
                    cb(null, totalPage);
                })
            },
            function (totalPage, cb) {
                db.queryArgs(sqlCommand.selectAllAtc, [pageSize, start], function (err, rows) {
                    if (!err) {
                        rows.forEach(item=>{
                            item.time = utils.formatTime(item.time);
                            item.tag = item.tag.split(',');
                            // item.bgColor = color[idx];
                        });
                        result = {
                            code: 200,
                            msg: 'success',
                            articleList: rows,
                            currentPage: currentPage,
                            totalPage: totalPage
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