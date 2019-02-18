
var tagsDao = require("../dao/TagsDao");
var blogDao = require("../dao/BlogDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var url = require("url");
var respUtil = require("../util/RespUtil");
var path = new Map();

function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true:false;
        });
        response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"})
        response.write(respUtil.writeResult("success","查询成功", result));
        response.end()
    })
}
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    // 查找标签的id
    tagsDao.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"})
            response.write(respUtil.writeResult("success","查询成功", result));
            response.end()
        } else {
            // 在映射表中查找文章
            tagBlogMappingDao.queryByTagByPage(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                // 挨个查找文章
                for (var i = 0; i < result.length;i++) {
                    blogDao.queryBlogById(result[i].blog_id,  (a) =>{
                        blogList.push(a[0]);
                        // 结束了再返回
                        if (blogList.length == result.length) {
                            for (var i = 0;i < blogList.length; i++) {
                                // 去掉img标签
                                blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/,"");
                                // 去掉标签
                                blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,"");
                                // 截断字符
                                blogList[i].content = blogList[i].content.substring(0,300)
                            }
                            response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"});
                            response.write(respUtil.writeResult("success","查询成功", blogList));
                            response.end()
                        }
                    });
                }
            })
        }
    });
}
path.set("/queryByTag", queryByTag);


function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    // 查找标签的id
    tagsDao.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"})
            response.write(respUtil.writeResult("success","查询成功", result));
            response.end()
        } else {
            // 在映射表中查找文章
            tagBlogMappingDao.queryByTagCount(result[0].id, function (a) {
                response.writeHead(200, {"Content-Type": "application/json;charset:UTF-8"})
                response.write(respUtil.writeResult("success","查询成功", a[0]));
                response.end()
            })
        }
    });
}
path.set("/queryByTagCount", queryByTagCount);
module.exports.path = path;