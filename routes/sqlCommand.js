var sqlCommand = {
    insertCmt:'insert into comment (content,email,article_id,lastCmt_email) values (?,?,?,?)',
    getAllCmt:'select * from comment where article_id = ?',
    insertAtc:'insert into article (title,tag,content,source_code) values (?,?,?,?)',
    selectAllAtc:'select * from article limit ? offset ?',
    // selectAllAtc:'SELECT SQL_CALC_FOUND_ROWS * from article limit ? offset ?',
    // getAtcCount:'SELECT FOUND_ROWS() as count'
    getAtcCount:'SELECT COUNT(id) as count FROM article',
    deleteAtc:'delete from article where id = ?',
    getThisAtc:'select * from article where id = ?',
    updateAtc:'update article set title = ?, tag = ?, content = ?, source_code = ? where id = ?',
};
module.exports = sqlCommand;