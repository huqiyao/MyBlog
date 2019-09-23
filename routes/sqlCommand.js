var sqlCommand = {
    insertCmt:'insert into comment (content,email) values (?,?)',
    insertAtc:'insert into article (title,tag,content) values (?,?,?)',
    selectAllAtc:'select * from article limit ? offset ?',
    // selectAllAtc:'SELECT SQL_CALC_FOUND_ROWS * from article limit ? offset ?',
    // getAtcCount:'SELECT FOUND_ROWS() as count'
    getAtcCount:'SELECT COUNT(id) as count FROM article',
    deleteAtc:'delete from article where id = ?',

};
module.exports = sqlCommand;