var path = new Map();
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMapping");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");


function queryHotBlog(request, response) {

    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryHotBlog", queryHotBlog);

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryAllBlog", queryAllBlog);

function queryBlogById (request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
        // 查看博客就views加1
        blogDao.addViews(parseInt(params.bid), function (result) {})
    })
}
path.set("/queryBlogById", queryBlogById);

function queryBlogCount (request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage (request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0;i < result.length; i++) {
            // 去掉img标签
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,"");
            // 去掉标签
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"");
            // 截断字符
            result[i].content = result[i].content.substring(0,300)
        }
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryBlogByPage", queryBlogByPage);

function editBlog (request, response) {
    var params = url.parse(request.url, true).query;
    // 防止提交标签的时候，有些人用中文逗号分隔
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
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