var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var commentDao = require("../dao/CommentDao");
var url = require("url");
var path = new Map();
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.name, params.email, params.comment, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"});
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end()
    })
}
path.set("/addComment", addComment);
module.exports.path = path;