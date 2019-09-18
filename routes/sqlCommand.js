var sqlCommand = {
    insertCmt:'insert into comment (content,email) values (?,?)',
    insertAtc:'insert into article (title,tag,content) values (?,?,?)',
    selectAllAtc:'select * from article'
};
module.exports = sqlCommand;