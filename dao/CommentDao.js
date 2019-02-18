var dbutil = require("../dao/DBUtil");

function insertComment (blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`,`user_name`, `email`, `comments`, `ctime`, `utime`) values (?,?,?,?,?,?,?,?)";
    var params = [blogId, parent, parentName, userName, email, comments, ctime, utime]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error);
        }
    })
    connection.end()
}

function queryCommentsByBlogId (id, success) {
    var querySql = "select * from comments where blog_id = ?";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    connection.end()
}

function queryCommentsCountByBlogId(id, success) {
    var querySql = "select count(1) as total from comments where blog_id = ?";
    var params = [id];
    var connection  = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}

module.exports = {
    "insertComment": insertComment,
    "queryCommentsByBlogId": queryCommentsByBlogId,
    "queryCommentsCountByBlogId": queryCommentsCountByBlogId
};