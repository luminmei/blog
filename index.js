var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/"));

// 接口在这里配置
app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));
app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentByBlogId", loader.get("/queryCommentByBlogId"));
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));
app.get("/queryAllBlog", loader.get("/queryAllBlog"));
app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComments", loader.get("/queryNewComments"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});