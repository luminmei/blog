var path = new Map();
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMapping");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

function editBlog (request, response) {
    var params = url.parse(request.url, true).query;
    // 防止提交标签的时候，有些人用中文逗号分隔
    var tags = params.tags.replace(/ /g, "");
    tags = tags.replace("，", ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data, params.tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            // 在结果里面有一个插入的id
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0 ; i < tagList.length; i ++) {
                if (tagList[i] == "") {
                    continue;
                }
                // 查询这个tag存不存在
                queryTag(tagList[i], blogId)
            }
        })
    });
}

path.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            // 没有这个标签，。我们希望插入这个标签
            insertTag(tag, blogId);
        } else {
            // 有标签的话，直接用结果的标签的id插入映射表
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}
// 创建了标签，再插入标签和博客的映射、
function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}
// 在映射表中插入记录
function insertTagBlogMapping (tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
    })
}

module.exports.path = path;