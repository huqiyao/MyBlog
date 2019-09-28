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

    db.queryArgs(sqlCommand.insertAtc, [param.title, param.tags, param['editor-html-code'], (param['editor-markdown-doc'])[0]], function (err, result) {
        // param['editor-markdown-doc'] 报错：Column count doesn't match value count at row 1
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


function queryAllArticle(req,res,page,size,callback) {
    var param = req.query || req.params;
    var result = {};
    // 获取前台页面传过来的参数
    var currentPage = parseInt(param.page ? param.page : page);// 页码
    var pageSize = parseInt(param.num ? param.num : size); // 显示得条数
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
                    totalPage = Math.ceil(rows[0].count / size);
                    console.log("总页数：" + totalPage);
                    cb(null, totalPage);
                })
            },
            function (totalPage, cb) {
                db.queryArgs(sqlCommand.selectAllAtc, [pageSize, start], function (err, rows) {
                    if (!err) {
                        var color = ["#b2dba1", "#FFB6C1", "#FFFACD", "#87CEFA"];
                        rows.forEach(item => {
                            item.time = utils.formatTime(item.time);
                            item.tag = item.tag.split(',');
                            var idx = Math.floor(Math.random() * 4);
                            item.bgColor = color[idx];
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
        function (err, ret) {
            callback(ret);
        }
    );
}

function deleteArticle(req, res, next) {
    var param = req.params;
    console.log("参数：" + param);
    db.queryArgs(sqlCommand.deleteAtc, param.id, function (err, result) {
        if (!err) {
            result = {
                code: 200,
                msg: 'success'
            }
        } else {
            result = {
                code: 201,
                msg: 'err:' + err
            }

        }
        db.doReturn(res, result);
    });
}


function getThisArticle(req, res, callback) {
    var param = req.params;
    var result = {};
    console.log(param);
    db.queryArgs(sqlCommand.getThisAtc, param.id, function (err, rows) {
        if (!err) {
            // console.log(rows[0].source_code);
            // rows[0].source_code = rows[0].source_code.split(',');
            result = {
                code: 200,
                msg: 'success',
                thisArticle: rows,
            };
            console.log(result);
        } else {
            result = {
                code: 201,
                msg: 'err:' + err,
            }

        }
        // callback(null,result); 导致报错
        callback(result);
    });
}

function updateArticle(req, res) {
    // let find = true;
    var id = req.params.id;
    var param = req.body;
    var result = {};
    db.queryArgs(sqlCommand.updateAtc, [param.title, param.tag, param.content, param.source_code, id], function (err, rows) {
        if (!err) {
            result = {
                code: 200,
                msg: 'success',
            }
        } else {
            result = {
                code: 201,
                msg: 'err:' + err
            }
        }
        // callback(result);
        res.send(result);
    });
}

module.exports = {
    addArticle: addArticle,
    queryAllArticle: queryAllArticle,
    deleteArticle: deleteArticle,
    getThisArticle: getThisArticle,
    updateArticle: updateArticle
}