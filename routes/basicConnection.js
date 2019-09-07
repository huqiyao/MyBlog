var mysql = require('mysql');
var dbConfig = require('./dbconfig');
const pool=mysql.createPool(dbConfig);
function responseDoReturn(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }

};

/**
 * 封装query之sql带不占位符func
 */
function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            callback(err,null,null);
        }else{
            connection.query(sql, function (err, rows) {
                connection.release();
                callback(err, rows);               //释放链接
            });
        }

    });
}

/**
 * 封装query之sql带占位符func
 */
function queryArgs(sql,args, callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            callback(err,null,null);
        }else{
            connection.query(sql, args,function (err, rows) {
                connection.release();
                callback(err, rows);
                //释放链接

            });
        }

    });
}

//exports
module.exports = {
    query: query,
    queryArgs: queryArgs,
    doReturn: responseDoReturn
}