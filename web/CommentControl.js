var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var commentDao = require("../dao/CommentDao");
var captcha = require("svg-captcha");

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

// 生成随机验证码
function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height:34});
    // 直接返回了图片
    // response.writeHead(200, {"Content-Type": "image/svg+xml"});
    // response.write(img.data);
    // response.end()
    response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"});
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end()
}
path.set("/queryRandomCode", queryRandomCode);
module.exports.path = path;